/* =========================================================
   Shigeryu Studio — affichage de la page d'accueil
   Les contenus viennent de assets/js/donnees.js,
   les textes d'interface traduits de assets/js/i18n.js.
   ========================================================= */
(function () {
  'use strict';
  /* Langue : si i18n.js est absent ou en erreur, tout reste en français */
  var I = window.I18N;
  if (!I) {                                            // page réaffichée tout de suite, en français
    document.documentElement.lang = 'fr';
    document.documentElement.classList.remove('i18n-attente');
  }

  var D = window.STUDIO;
  if (!D) return;

  var FR_SECOURS = { 'menu.ouvrir': 'Ouvrir le menu', 'menu.fermer': 'Fermer le menu', 'filtre.tousDomaines': 'Tous les domaines',
    'filtre.tousEtats': 'Tous les états', 'etat.idee': 'Idée', 'etat.encours': 'En cours', 'etat.prototype': 'Prototype', 'etat.termine': 'Terminé',
    'visuel.aVenir': 'Visuel à venir', 'visuel.duProjet': 'Visuel du projet ', 'projet.exemple': 'Exemple', 'projet.avancement': 'Avancement',
    'projet.voir': 'Voir le projet', 'lien.nouvelOnglet': ' (nouvel onglet)', 'boutique.ouvrir': 'Ouvrir ', 'boutique.bientot': 'Lien bientôt disponible' };
  function t(cle, n) {
    if (I) return I.t(cle, n);
    if (cle === 'compteur') return n + (n > 1 ? ' projets affichés' : ' projet affiché');
    return FR_SECOURS[cle] || cle;
  }
  function enAnglais() { return !!I && I.langue() === 'en'; }
  /* Champ traduit d'une donnée : « texte_en » en anglais s'il existe, sinon « texte » */
  function tr(obj, champ) { return (enAnglais() && obj[champ + '_en']) || obj[champ]; }

  var ETATS = ['idee', 'encours', 'prototype', 'termine'];

  function $(id) { return document.getElementById(id); }
  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function ico(nom) { return '<svg class="ico" aria-hidden="true"><use href="#i-' + nom + '"/></svg>'; }
  function nouvelOnglet() { return '<span class="sr">' + esc(t('lien.nouvelOnglet')) + '</span>'; }
  var domaineParId = {};
  D.domaines.forEach(function (d) { domaineParId[d.id] = d; });

  /* ---------- Domaines ---------- */
  function afficherDomaines() {
    $('liste-domaines').innerHTML = D.domaines.map(function (d, i) {
      return '<li class="domaine" data-couleur="' + d.couleur + '">' +
        '<span class="domaine-numero" aria-hidden="true">0' + (i + 1) + '</span>' +
        '<div class="domaine-icone">' + ico(d.icone) + '</div>' +
        '<h3>' + esc(tr(d, 'titre')) + '</h3><p>' + esc(tr(d, 'texte')) + '</p></li>';
    }).join('');
  }

  /* ---------- Projets : filtres + galerie ---------- */
  var filtre = { domaine: 'tous', etat: 'tous' };

  function boutonsFiltre(conteneur, cle, options) {
    $(conteneur).innerHTML = options.map(function (o) {
      return '<button class="filtre" type="button" data-cle="' + cle + '" data-valeur="' + o[0] + '" aria-pressed="' + (o[0] === filtre[cle]) + '">' + esc(o[1]) + '</button>';
    }).join('');
  }
  // Un filtre n'est affiché que s'il a au moins un projet visible : il réapparaît
  // automatiquement dès qu'un projet correspondant est ajouté dans donnees.js
  function aDesProjets(cle, valeur) {
    return projetsVisibles.some(function (p) { return p[cle] === valeur; });
  }
  function afficherFiltres() {
    var domaines = D.domaines.filter(function (d) { return !d.sansFiltre && aDesProjets('domaine', d.id); });
    var etats = ETATS.filter(function (k) { return aDesProjets('etat', k); });
    if (!domaines.some(function (d) { return d.id === filtre.domaine; })) filtre.domaine = 'tous';
    if (etats.indexOf(filtre.etat) < 0) filtre.etat = 'tous';
    boutonsFiltre('filtres-domaine', 'domaine', [['tous', t('filtre.tousDomaines')]].concat(
      domaines.map(function (d) { return [d.id, tr(d, 'titre')]; })));
    boutonsFiltre('filtres-etat', 'etat', [['tous', t('filtre.tousEtats')]].concat(
      etats.map(function (k) { return [k, t('etat.' + k)]; })));
  }

  function visuelManquant(icone) { return ico(icone) + '<span class="projet-legende">' + esc(t('visuel.aVenir')) + '</span>'; }

  // Si un fichier image est introuvable, la carte revient au visuel « à venir »
  // (le visuel de survol, lui, est simplement retiré s'il est introuvable)
  function surveillerImages(zone) {
    zone.querySelectorAll('.projet-visuel img').forEach(function (img) {
      img.addEventListener('error', function () {
        if (!img.classList.contains('projet-survol')) img.insertAdjacentHTML('afterend', visuelManquant(img.getAttribute('data-icone')));
        img.remove();
      });
    });
  }

  // Les animations de survol ne sont téléchargées qu'au premier survol (ou focus clavier) de leur carte
  function chargerSurvol(e) {
    var carte = e.target.closest && e.target.closest('.projet');
    var img = carte && carte.querySelector('.projet-survol[data-src]');
    if (!img) return;
    if (img.hasAttribute('data-srcset')) { img.srcset = img.getAttribute('data-srcset'); img.removeAttribute('data-srcset'); }
    img.src = img.getAttribute('data-src'); img.removeAttribute('data-src');
  }
  $('galerie').addEventListener('pointerover', chargerSurvol);
  $('galerie').addEventListener('focusin', chargerSurvol);

  // Chemins de visuels : les espaces et accents des noms de dossiers sont encodés pour l'adresse
  function chemin(c) { return esc(encodeURI(c)); }
  // Deux tailles du même visuel : le navigateur choisit selon la définition de l'écran
  function tailles(petit, grand) { return petit ? chemin(petit) + ' 1x, ' + chemin(grand) + ' 2x' : ''; }

  function carteProjet(p) {
    var d = domaineParId[p.domaine] || { titre: p.domaine, icone: 'cube', couleur: 'violet' };
    var titre = tr(p, 'titre');
    var visuel = p.image
      ? '<img src="' + chemin(p.image) + '"' + (p.image1x ? ' srcset="' + tailles(p.image1x, p.image) + '"' : '') + ' alt="' + esc(tr(p, 'imageAlt') || t('visuel.duProjet') + titre) + '" loading="lazy" data-icone="' + d.icone + '">' +
        (p.imageSurvol ? '<img class="projet-survol" data-src="' + chemin(p.imageSurvol) + '"' + (p.imageSurvol1x ? ' data-srcset="' + tailles(p.imageSurvol1x, p.imageSurvol) + '"' : '') + ' alt="">' : '')
      : visuelManquant(d.icone);
    var lien = p.lien
      ? '<a class="projet-lien" href="' + esc(p.lien) + '" target="_blank" rel="noopener">' + esc(tr(p, 'lienTexte') || t('projet.voir')) + ' ' + ico('sortie') + nouvelOnglet() + '</a>'
      : '';
    var plateforme = tr(p, 'plateforme');
    var avancement = Math.max(0, Math.min(100, +p.avancement || 0));
    return '<li class="projet" data-couleur="' + d.couleur + '">' +
      '<div class="projet-visuel">' + (p.exemple ? '<span class="projet-demo">' + esc(t('projet.exemple')) + '</span>' : '') + visuel + '</div>' +
      '<div class="projet-corps">' +
        '<div class="projet-meta"><span class="etat etat--' + p.etat + '">' + esc(t('etat.' + p.etat)) + '</span>' +
        '<span class="projet-domaine">' + esc(tr(d, 'titre')) + (plateforme ? ' · ' + esc(plateforme) : '') + '</span></div>' +
        '<h3>' + esc(titre) + '</h3><p>' + esc(tr(p, 'texte')) + '</p>' +
        '<div class="xp" data-couleur="' + (p.etat === 'termine' ? 'vert' : 'orange') + '"><div class="xp-ligne"><span>' + esc(t('projet.avancement')) + '</span><span>' + avancement + ' %</span></div>' +
        '<div class="xp-jauge" role="progressbar" aria-label="' + esc(t('projet.avancement')) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + avancement + '"><i data-xp="' + avancement + '"></i></div></div>' +
        lien +
      '</div></li>';
  }

  function remplirJauges(zone) {
    // Court délai pour que la jauge parte de 0 et s'anime jusqu'à sa valeur
    setTimeout(function () {
      zone.querySelectorAll('[data-xp]').forEach(function (i) { i.style.width = i.getAttribute('data-xp') + '%'; });
    }, 60);
  }

  // Projets visibles : les fiches d'exemple sont écartées si afficherExemples vaut false
  var projetsVisibles = D.projets.filter(function (p) { return D.afficherExemples || !p.exemple; });

  function afficherProjets() {
    var liste = projetsVisibles.filter(function (p) {
      return (filtre.domaine === 'tous' || p.domaine === filtre.domaine) &&
             (filtre.etat === 'tous' || p.etat === filtre.etat);
    });
    $('galerie').innerHTML = liste.map(carteProjet).join('');
    surveillerImages($('galerie'));
    $('vide').hidden = liste.length > 0;
    $('compteur').textContent = t('compteur', liste.length);
    remplirJauges($('galerie'));
  }

  // Un seul écouteur par groupe de filtres : il fonctionne aussi après la reconstruction des boutons
  ['filtres-domaine', 'filtres-etat'].forEach(function (id) {
    $(id).addEventListener('click', function (e) {
      var b = e.target.closest('.filtre');
      if (!b) return;
      var cle = b.getAttribute('data-cle');
      filtre[cle] = b.getAttribute('data-valeur');
      $(id).querySelectorAll('.filtre').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      afficherProjets();
    });
  });
  $('reinitialiser').addEventListener('click', function () {
    filtre.domaine = 'tous'; filtre.etat = 'tous';
    afficherFiltres(); afficherProjets();
  });
  $('avis-demo').hidden = !projetsVisibles.some(function (p) { return p.exemple; });

  /* ---------- Boutiques ---------- */
  function afficherBoutiques() {
    $('liste-boutiques').innerHTML = D.boutiques.map(function (b) {
      var bouton = b.url
        ? '<a class="bouton bouton--orange" href="' + esc(b.url) + '" target="_blank" rel="noopener">' + esc(t('boutique.ouvrir') + b.nom) + ' ' + ico('sortie') + nouvelOnglet() + '</a>'
        : '<span class="bouton" aria-disabled="true">' + esc(t('boutique.bientot')) + '</span>';
      return '<li class="boutique" data-couleur="' + b.couleur + '">' +
        '<div class="boutique-tete"><div class="boutique-icone">' + ico(b.icone) + '</div>' +
        '<div><h3>' + esc(b.nom) + '</h3><span class="boutique-type">' + esc(tr(b, 'type')) + '</span></div></div>' +
        '<p>' + esc(tr(b, 'texte')) + '</p>' + bouton + '</li>';
    }).join('');
  }

  /* ---------- Réseaux ---------- */
  var couleursReseaux = ['rose', 'cyan', 'violet', 'orange', 'vert'];
  function afficherReseaux() {
    $('liste-reseaux').innerHTML = D.reseaux.map(function (r, i) {
      return '<li class="reseau" data-couleur="' + couleursReseaux[i % couleursReseaux.length] + '">' +
        '<a href="' + esc(r.url) + '" target="_blank" rel="noopener me">' +
        '<span class="reseau-icone">' + ico(r.icone) + '</span>' +
        '<span><span class="reseau-nom">' + esc(r.nom) + '</span><span class="reseau-pseudo">' + esc(r.pseudo) + '</span></span>' +
        '<span class="reseau-sortie">' + ico('sortie') + nouvelOnglet() + '</span></a></li>';
    }).join('');
    $('pied-reseaux').innerHTML = D.reseaux.map(function (r) {
      return '<li><a href="' + esc(r.url) + '" target="_blank" rel="noopener me">' + ico(r.icone) + esc(r.nom) + nouvelOnglet() + '</a></li>';
    }).join('');
  }

  /* ---------- Contact ---------- */
  function afficherContact() {
    if (D.contact && D.contact.email) {
      $('lien-mail').href = 'mailto:' + D.contact.email;
      $('texte-mail').textContent = D.contact.email;
      $('delai').textContent = tr(D.contact, 'delai');
    }
  }
  $('annee').textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  var boutonMenu = document.querySelector('.menu-bouton');
  var menu = $('menu-principal');
  function texteBoutonMenu() {
    var ouvert = boutonMenu.getAttribute('aria-expanded') === 'true';
    boutonMenu.querySelector('.sr').textContent = t(ouvert ? 'menu.fermer' : 'menu.ouvrir');
  }
  function fermerMenu() {
    boutonMenu.setAttribute('aria-expanded', 'false');
    texteBoutonMenu();
    menu.classList.remove('ouvert');
  }
  boutonMenu.addEventListener('click', function () {
    var ouvert = boutonMenu.getAttribute('aria-expanded') === 'true';
    if (ouvert) { fermerMenu(); return; }
    boutonMenu.setAttribute('aria-expanded', 'true');
    texteBoutonMenu();
    menu.classList.add('ouvert');
  });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) fermerMenu(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('ouvert')) { fermerMenu(); boutonMenu.focus(); }
  });

  /* ---------- Affichage complet (au chargement et à chaque changement de langue) ---------- */
  function afficherTout() {
    afficherDomaines();
    afficherFiltres();
    afficherProjets();
    afficherBoutiques();
    afficherReseaux();
    afficherContact();
    texteBoutonMenu();
  }
  afficherTout();
  if (I) I.surChangement(afficherTout);

  /* ---------- En-tête au défilement + lien actif ---------- */
  var entete = $('entete');
  function surDefilement() { entete.classList.toggle('defile', window.scrollY > 8); }
  window.addEventListener('scroll', surDefilement, { passive: true });
  // État initial lu juste après le premier affichage, pour ne pas forcer un recalcul de la mise en page
  requestAnimationFrame(function () { setTimeout(surDefilement, 0); });

  if ('IntersectionObserver' in window) {
    var liensMenu = menu.querySelectorAll('a');
    var obsSections = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id === 'domaines' ? 'accueil' : e.target.id;
        liensMenu.forEach(function (a) {
          if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main > section').forEach(function (s) { obsSections.observe(s); });

    /* Apparition au défilement */
    var obsApparition = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('vu'); obsApparition.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-apparait]').forEach(function (el) { obsApparition.observe(el); });
  } else {
    document.querySelectorAll('[data-apparait]').forEach(function (el) { el.classList.add('vu'); });
  }
})();
