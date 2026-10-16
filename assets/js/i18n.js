/* =========================================================
   Shigeryu Studio — langues (français / anglais)

   Fonctionnement :
   - Le français est écrit directement dans index.html : c'est la langue par défaut,
     et celle qui s'affiche si JavaScript ne fonctionne pas.
   - Les éléments traduisibles portent data-i18n="clé" (leur contenu) ou
     data-i18n-attr="attribut:clé,attribut:clé" (leurs attributs).
     Leur texte français est mémorisé au démarrage : on ne le recopie pas ici.
   - TEXTES.en contient l'anglais de toutes ces clés.
   - TEXTES.fr / TEXTES.en contiennent aussi les textes fabriqués par accueil.js
     (filtres, états, compteur, boutons…), utilisés via I18N.t('clé').
   - Les textes des données (catégories, projets, boutiques…) sont dans donnees.js,
     avec un champ « _en » à côté du champ français (titre_en, texte_en…).

   Ajouter un texte : mettre data-i18n="ma.cle" dans index.html, puis
   'ma.cle': 'English text' dans TEXTES.en ci-dessous.

   Le choix de langue est mémorisé dans le navigateur (localStorage, clé « shigeryu-langue »).
   Aucun cookie, aucun service externe. Si la mémorisation est impossible, le site reste
   en français et le bouton FR | EN fonctionne quand même pendant la visite.
   ========================================================= */
window.I18N = (function () {
  'use strict';
  var CLE_STOCKAGE = 'shigeryu-langue';
  var html = document.documentElement;

  var TEXTES = {
    /* --- Français : uniquement les textes fabriqués par JavaScript --- */
    fr: {
      'menu.ouvrir': 'Ouvrir le menu',
      'menu.fermer': 'Fermer le menu',
      'filtre.tousDomaines': 'Tous les domaines',
      'filtre.tousEtats': 'Tous les états',
      'etat.idee': 'Idée',
      'etat.encours': 'En cours',
      'etat.prototype': 'Prototype',
      'etat.termine': 'Terminé',
      'compteur': function (n) { return n + (n > 1 ? ' projets affichés' : ' projet affiché'); },
      'visuel.aVenir': 'Visuel à venir',
      'visuel.duProjet': 'Visuel du projet ',
      'projet.exemple': 'Exemple',
      'projet.avancement': 'Avancement',
      'projet.voir': 'Voir le projet',
      'lien.nouvelOnglet': ' (nouvel onglet)',
      'boutique.ouvrir': 'Ouvrir ',
      'boutique.bientot': 'Lien bientôt disponible'
    },

    /* --- Anglais : textes de index.html + textes fabriqués par JavaScript --- */
    en: {
      /* En-tête de la page (onglet, moteurs de recherche, partage) */
      'meta.titre': 'Shigeryu Studio — Creative workshop: 3D, cosplay, video games and apps',
      'meta.description': 'Shigeryu Studio, Shigeryu’s creative workshop: 3D modeling and printing, cosplay, video games, apps and AI-assisted creations.',
      'meta.ogTitre': 'Shigeryu Studio — Creative workshop',
      'meta.ogDescription': '3D modeling and printing, cosplay, video games, apps and AI-assisted creations.',
      'meta.ogLocale': 'en_US',

      /* Navigation */
      'nav.evitement': 'Skip to content',
      'nav.logo': 'Shigeryu Studio, back to the top of the page',
      'nav.principale': 'Main navigation',
      'nav.accueil': 'Home',
      'nav.projets': 'Projects',
      'nav.shop': 'Shop',
      'nav.reseaux': 'Socials',
      'nav.apropos': 'About',
      'nav.contact': 'Contact',

      /* Accueil */
      'hero.hud': 'Player 1 · the workshop is open',
      'hero.ligne1': 'Welcome to',
      'hero.ligne2': 'my <span class="surligne">creative&nbsp;workshop</span>!',
      'hero.intro': 'Here I share my creations and experiments around 3D, video games, apps and other creative projects.',
      'hero.voirProjets': 'See the projects',
      'hero.visiterShop': 'Visit the shop',
      'hero.note': 'press Start!',

      /* Illustration */
      'scene.idee': 'Idea',
      'scene.numero': '#42',
      'scene.developper': 'Develop',
      'scene.jeux': 'Video games',
      'scene.ia': 'AI',

      /* Bandeau */
      'bandeau.label': 'The spirit of the workshop',
      'bandeau.imaginer': 'Imagine',
      'bandeau.creer': 'Create',
      'bandeau.modeliser': 'Model',
      'bandeau.fabriquer': 'Make',
      'bandeau.developper': 'Develop',
      'bandeau.experimenter': 'Experiment',

      /* Domaines */
      'domaines.etiquette': 'Character select',
      'domaines.titre': 'My playgrounds',
      'domaines.texte': 'Six worlds, one drive: to imagine, make and share.',

      /* Projets */
      'projets.etiquette': 'Level select',
      'projets.titre': 'Projects',
      'projets.texte': 'Ideas, works in progress, prototypes and finished creations: each project shows how far along it is.',
      'projets.avis': '<strong>Note:</strong> cards marked “Example” are demos. They will be replaced by real projects.',
      'projets.filtreDomaine': 'Filter by category',
      'projets.filtreEtat': 'Filter by status',
      'projets.vide': 'Nothing here… yet!',
      'projets.toutAfficher': 'Show all projects',

      /* Shop */
      'shop.etiquette': 'The inn’s shop',
      'shop.titre': 'The shop',
      'shop.texte': 'My creations are available on specialized platforms. Purchase, payment and delivery are handled directly on each of them.',

      /* Réseaux */
      'reseaux.etiquette': 'Multiplayer mode',
      'reseaux.titre': 'Follow along?',
      'reseaux.texte': 'Behind the scenes, project updates and news: find the workshop on social media.',

      /* À propos */
      'apropos.etiquette': 'Creator profile',
      'apropos.titre': 'About',
      'apropos.texte1': 'Shigeryu Studio is my little creative workshop: 3D, video games, apps and plenty of other projects, sometimes with a little help from AI.',
      'apropos.texte2': 'Here I share my creations, experiments and ideas, whether they’re finished or still in progress.',

      /* Contact */
      'contact.etiquette': 'Send a message',
      'contact.titre': 'Contact',
      'contact.texte': 'A question, an idea, a project to suggest, or just want to chat? Write to me!',

      /* Pied de page */
      'pied.description': 'Creative workshop: 3D, cosplay, video games, apps and AI-assisted creations.',
      'pied.continuer': 'Continue? <span class="clignote">▶ Yes</span>',
      'pied.plan': 'Site map',
      'pied.niveaux': 'Levels',
      'pied.multijoueur': 'Multiplayer',
      'pied.haut': 'Back to level&nbsp;1',

      /* Textes fabriqués par JavaScript */
      'menu.ouvrir': 'Open menu',
      'menu.fermer': 'Close menu',
      'filtre.tousDomaines': 'All categories',
      'filtre.tousEtats': 'All statuses',
      'etat.idee': 'Idea',
      'etat.encours': 'In progress',
      'etat.prototype': 'Prototype',
      'etat.termine': 'Completed',
      'compteur': function (n) { return n + (n === 1 ? ' project shown' : ' projects shown'); },   // en anglais, 0 prend le pluriel
      'visuel.aVenir': 'Image coming soon',
      'visuel.duProjet': 'Image of the project ',
      'projet.exemple': 'Example',
      'projet.avancement': 'Progress',
      'projet.voir': 'View project',
      'lien.nouvelOnglet': ' (opens in a new tab)',
      'boutique.ouvrir': 'Visit ',
      'boutique.bientot': 'Link coming soon'
    }
  };

  /* ----- Mémorisation (toujours protégée : le stockage peut être bloqué) ----- */
  function lire() { try { return window.localStorage.getItem(CLE_STOCKAGE); } catch (e) { return null; } }
  function ecrire(l) { try { window.localStorage.setItem(CLE_STOCKAGE, l); } catch (e) { /* tant pis : choix non mémorisé */ } }

  var langue = lire() === 'en' ? 'en' : 'fr';       // français par défaut, jamais imposé par le navigateur
  var originaux = [];                                  // textes français d'origine, relevés dans le HTML
  var ecouteurs = [];

  function t(cle, n) {
    var v = TEXTES[langue][cle];
    if (v === undefined) v = TEXTES.fr[cle];
    if (v === undefined) return cle;
    return typeof v === 'function' ? v(n) : v;
  }

  /* Relève une seule fois le français écrit dans le HTML */
  function releverOriginaux() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      originaux.push({ el: el, cle: el.getAttribute('data-i18n'), html: el.innerHTML });
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (paire) {
        var p = paire.split(':');
        var attr = p[0].trim(), cle = (p[1] || '').trim();
        if (attr && cle) originaux.push({ el: el, cle: cle, attr: attr, valeur: el.getAttribute(attr) });
      });
    });
  }

  function appliquer() {
    html.lang = langue;
    originaux.forEach(function (o) {
      var en = TEXTES.en[o.cle];
      var traduit = langue === 'en' && typeof en === 'string';
      if (o.attr) o.el.setAttribute(o.attr, traduit ? en : o.valeur);
      else o.el.innerHTML = traduit ? en : o.html;
    });
    document.querySelectorAll('[data-langue]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-langue') === langue));
    });
  }

  function changer(l) {
    if (l !== 'fr' && l !== 'en') return;
    langue = l;
    ecrire(l);
    appliquer();
    ecouteurs.forEach(function (f) { try { f(l); } catch (e) { /* une erreur ne bloque pas le reste */ } });
  }

  /* Page visible : retire le masquage temporaire posé par js-actif.js */
  function pret() { html.classList.remove('i18n-attente'); }

  /* ----- Démarrage (le script est chargé avec « defer » : le HTML est déjà prêt) ----- */
  try {
    releverOriginaux();
    appliquer();
    document.querySelectorAll('[data-langue]').forEach(function (b) {
      b.addEventListener('click', function () { changer(b.getAttribute('data-langue')); });
    });
    html.classList.add('i18n-ok');                     // affiche le bouton FR | EN
  } catch (e) {
    langue = 'fr';                                     // en cas de problème : le site reste en français
    try { appliquer(); } catch (e2) { html.lang = 'fr'; }
  } finally {
    // Secours : dès que la page est prête (après accueil.js), elle redevient visible,
    // même si un script a échoué. js-actif.js prévoit en plus un délai maximal.
    document.addEventListener('DOMContentLoaded', pret);
    if (document.readyState === 'complete') pret();
  }

  return {
    t: t,
    langue: function () { return langue; },
    changer: changer,
    surChangement: function (f) { ecouteurs.push(f); },
    pret: pret
  };
})();
