/* =========================================================
   DONNÉES DU SITE — Shigeryu Studio
   C'est le seul fichier à modifier pour mettre à jour
   les projets, les liens des boutiques et les réseaux.
   ========================================================= */
window.STUDIO = {

  /* ---------- Projets d'exemple ----------
     false : les fiches marquées « exemple: true » sont masquées sur le site (elles restent ci-dessous).
     true  : elles réapparaissent, avec l'étiquette « Exemple ». */
  afficherExemples: false,

  /* ---------- Traductions anglaises ----------
     Chaque texte affiché peut avoir sa version anglaise dans un champ « _en » placé juste à côté
     (titre_en, texte_en, type_en, imageAlt_en, lienTexte_en, plateforme_en, delai_en).
     Si un champ « _en » manque, le texte français s'affiche aussi en anglais.
     Les noms propres (projets, plateformes, réseaux) ne sont pas traduits. */

  /* ---------- Domaines de création (cartes « compétences ») ---------- */
  domaines: [
    { id: 'modelisation', titre: 'Modélisation 3D', titre_en: '3D modeling', icone: 'cube', couleur: 'violet',
      texte: 'Personnages, objets et pièces techniques imaginés et sculptés en 3D, du croquis au modèle final.',
      texte_en: 'Characters, objects and technical parts designed and sculpted in 3D, from first sketch to final model.' },
    { id: 'impression', titre: 'Impression 3D', titre_en: '3D printing', icone: 'imprimante', couleur: 'orange',
      texte: 'Des modèles qui sortent de l’écran : prototypes, figurines, accessoires et pièces sur mesure.',
      texte_en: 'Models that leave the screen: prototypes, figurines, accessories and custom parts.' },
    { id: 'cosplay', titre: 'Cosplay', titre_en: 'Cosplay', icone: 'casque', couleur: 'rose', sansFiltre: true,
      texte: 'Accessoires et éléments de costumes pour donner vie à des personnages.',
      texte_en: 'Accessories and costume pieces that bring characters to life.' },
    { id: 'jeux', titre: 'Jeux vidéo', titre_en: 'Video games', icone: 'manette', couleur: 'bleu',
      texte: 'Des jeux vidéo à découvrir et à partager, sur téléphone ou sur ordinateur.',
      texte_en: 'Video games to discover and share, on phone or computer.' },
    { id: 'applications', titre: 'Applications', titre_en: 'Apps', icone: 'fenetre', couleur: 'vert',
      texte: 'Des applications pour téléphone et ordinateur, nées d’un besoin ou d’une envie d’expérimenter.',
      texte_en: 'Apps for phone and computer, born from a need or simply the urge to experiment.' },
    // sansFiltre : la catégorie reste dans « Mes terrains de jeu » mais n'a pas de bouton dans « Les projets »
    { id: 'ia', titre: 'Créations avec l’IA', titre_en: 'AI creations', icone: 'etincelle', couleur: 'jaune', sansFiltre: true,
      texte: 'Des expériences où l’intelligence artificielle sert d’outil créatif, toujours guidée à la main.',
      texte_en: 'Experiments where artificial intelligence is a creative tool, always guided by hand.' }
  ],

  /* ---------- Projets ----------
     etat : 'idee' | 'encours' | 'prototype' | 'termine'
     avancement : 0 à 100
     exemple : true = fiche de démonstration (masquée tant que afficherExemples vaut false)
     image : chemin vers un visuel, par ex. 'assets/img/nom.png' (laisser '' en attendant)
     imageAlt : description courte de l'image pour l'accessibilité (facultatif)
     lien : adresse d'une page externe (laisser '' s'il n'y en a pas)
     lienTexte : texte du bouton de lien (facultatif, « Voir le projet » par défaut)
     plateforme : précision affichée à côté de la catégorie (facultatif, ex. 'Android', 'Windows')
     imageSurvol : deuxième visuel affiché au survol de la carte, par ex. une animation (facultatif)
  */
  projets: [
    { titre: 'Fractal Snake', domaine: 'jeux', plateforme: 'Android', etat: 'termine', avancement: 100, exemple: false,
      image: 'assets/img/fractal-snake.png', imageAlt: 'Icône du jeu Fractal Snake', imageAlt_en: 'Fractal Snake game icon',
      lien: 'https://play.google.com/store/apps/details?id=com.shigeryustudio.fractalsnake', lienTexte: 'Voir sur Google Play', lienTexte_en: 'View on Google Play',
      texte: 'Jeu Android disponible sur Google Play.', texte_en: 'Android game available on Google Play.' },
    { titre: 'WiiU GamePad Overlay', domaine: 'applications', plateforme: 'Windows', etat: 'termine', avancement: 100, exemple: false,
      image: 'assets/img/wiiu-gamepad-overlay.png', imageAlt: 'Visuel de l’application WiiU GamePad Overlay', imageAlt_en: 'WiiU GamePad Overlay app visual',
      lien: 'https://shigeryu.itch.io/wiiu-gamepad-overlay', lienTexte: 'Voir sur itch.io', lienTexte_en: 'View on itch.io',
      texte: 'Application Windows disponible sur itch.io.', texte_en: 'Windows app available on itch.io.' },
    { titre: 'Épée Kokiri', domaine: 'impression', etat: 'termine', avancement: 100, exemple: false,
      image: 'visuels/Impression 3D/Zelda/LinkSword.webp', imageAlt: 'Épée Kokiri imprimée en 3D', imageAlt_en: '3D-printed Kokiri Sword',
      lien: '',
      texte: 'Réplique de l’épée Kokiri de The Legend of Zelda: Ocarina of Time (remake), imprimée en 3D.',
      texte_en: '3D-printed replica of the Kokiri Sword from The Legend of Zelda: Ocarina of Time (remake).' },
    { titre: 'Bracelet Goron', domaine: 'impression', etat: 'termine', avancement: 100, exemple: false,
      image: 'visuels/Impression 3D/Zelda/BraceletImg.webp', imageAlt: 'Bracelet Goron doré imprimé en 3D', imageAlt_en: 'Gold 3D-printed Goron Bracelet',
      imageSurvol: 'visuels/Impression 3D/Zelda/Bracelet.webp',
      lien: '',
      texte: 'Réplique du bracelet Goron de The Legend of Zelda: Ocarina of Time (remake), imprimée en 3D.',
      texte_en: '3D-printed replica of the Goron Bracelet from The Legend of Zelda: Ocarina of Time (remake).' },
    { titre: 'Faceplate « La Grande Vague »', domaine: 'impression', plateforme: 'Dock Nintendo Switch 2', plateforme_en: 'Nintendo Switch 2 dock', etat: 'termine', avancement: 100, exemple: false,
      image: 'visuels/Impression 3D/Faceplates/BigWaveFaceplate.webp', imageAlt: 'Façade imprimée en 3D au motif de la grande vague', imageAlt_en: '3D-printed faceplate with a great wave design',
      imageSurvol: 'visuels/Impression 3D/Faceplates/BigWaveFaceplatePrimpt.webp',
      lien: '',
      texte: 'Façade décorative pour le dock de la Nintendo Switch 2, imprimée en 3D au motif de la grande vague.',
      texte_en: 'Decorative faceplate for the Nintendo Switch 2 dock, 3D printed with a great wave design.' },
    { titre: 'Projet exemple — figurine', titre_en: 'Example project — figurine', domaine: 'modelisation', etat: 'encours', avancement: 55, exemple: true, image: '', lien: '',
      texte: 'Fiche de démonstration : la description d’un projet de modélisation apparaîtra ici.',
      texte_en: 'Demo card: the description of a modeling project will appear here.' },
    { titre: 'Projet exemple — accessoire imprimé', titre_en: 'Example project — printed accessory', domaine: 'impression', etat: 'prototype', avancement: 75, exemple: true, image: '', lien: '',
      texte: 'Fiche de démonstration : la description d’une impression 3D apparaîtra ici.',
      texte_en: 'Demo card: the description of a 3D print will appear here.' },
    { titre: 'Projet exemple — accessoire de cosplay', titre_en: 'Example project — cosplay accessory', domaine: 'cosplay', etat: 'idee', avancement: 10, exemple: true, image: '', lien: '',
      texte: 'Fiche de démonstration : la description d’un accessoire de cosplay apparaîtra ici.',
      texte_en: 'Demo card: the description of a cosplay accessory will appear here.' },
    { titre: 'Projet exemple — jeu vidéo', titre_en: 'Example project — video game', domaine: 'jeux', etat: 'encours', avancement: 40, exemple: true, image: '', lien: '',
      texte: 'Fiche de démonstration : la description d’un jeu vidéo apparaîtra ici.',
      texte_en: 'Demo card: the description of a video game will appear here.' },
    { titre: 'Projet exemple — application mobile', titre_en: 'Example project — mobile app', domaine: 'applications', plateforme: 'Android', etat: 'termine', avancement: 100, exemple: true, image: '', lien: '',
      texte: 'Fiche de démonstration : la description d’une application Android apparaîtra ici.',
      texte_en: 'Demo card: the description of an Android app will appear here.' },
    { titre: 'Projet exemple — outil pour PC', titre_en: 'Example project — PC tool', domaine: 'applications', plateforme: 'Windows', etat: 'prototype', avancement: 65, exemple: true, image: '', lien: '',
      texte: 'Fiche de démonstration : la description d’une application Windows apparaîtra ici.',
      texte_en: 'Demo card: the description of a Windows app will appear here.' },
    { titre: 'Projet exemple — expérience IA', titre_en: 'Example project — AI experiment', domaine: 'ia', etat: 'idee', avancement: 15, exemple: true, image: '', lien: '',
      texte: 'Fiche de démonstration : la description d’une création assistée par IA apparaîtra ici.',
      texte_en: 'Demo card: the description of an AI-assisted creation will appear here.' },
    { titre: 'Projet exemple — pièce sur mesure', titre_en: 'Example project — custom part', domaine: 'impression', etat: 'termine', avancement: 100, exemple: true, image: '', lien: '',
      texte: 'Fiche de démonstration : la description d’un autre projet imprimé apparaîtra ici.',
      texte_en: 'Demo card: the description of another printed project will appear here.' }
  ],

  /* ---------- Boutiques externes ----------
     url : laisser '' tant que l'adresse n'est pas connue → le bouton affiche « Lien bientôt disponible ».
  */
  boutiques: [
    { nom: 'Etsy', type: 'Créations physiques', type_en: 'Physical creations', icone: 'colis', couleur: 'orange', url: 'https://www.etsy.com/fr/shop/ShigeryuShop',
      texte: 'Créations imprimées en 3D, accessoires et objets prêts à recevoir.',
      texte_en: '3D-printed creations, accessories and ready-to-ship items.' },
    { nom: 'Vinted', type: 'Objets physiques', type_en: 'Physical items', icone: 'cintre', couleur: 'vert', url: 'https://www.vinted.fr/member/52945773',
      texte: 'Des objets mis en vente sur Vinted, à acheter directement sur la plateforme.',
      texte_en: 'Items for sale on Vinted, to buy directly on the platform.' },
    { nom: 'CGTrader', type: 'Modèles 3D · numérique', type_en: '3D models · digital', icone: 'fichier', couleur: 'violet', url: 'https://www.cgtrader.com/designers/shigeryu',
      texte: 'Modèles 3D à télécharger pour les imprimer vous-même.',
      texte_en: '3D models to download and print yourself.' },
    { nom: 'Cults3D', type: 'Fichiers 3D · numérique', type_en: '3D files · digital', icone: 'fichier', couleur: 'bleu', url: 'https://cults3d.com/fr/utilisateurs/Shigeryu/fichiers-3d',
      texte: 'Une autre plateforme pour retrouver les fichiers 3D à imprimer.',
      texte_en: 'Another platform to find 3D files ready to print.' }
  ],

  /* ---------- Réseaux sociaux (Instagram, TikTok, X vérifiés le 12/10/2026 ; YouTube fourni le 14/10/2026) ---------- */
  reseaux: [
    { nom: 'Instagram', pseudo: '@shigeryuinsta', icone: 'instagram', url: 'https://www.instagram.com/shigeryuinsta/' },
    { nom: 'TikTok', pseudo: '@shigeryutiktok', icone: 'tiktok', url: 'https://www.tiktok.com/@shigeryutiktok' },
    { nom: 'X', pseudo: '@ShigeryuInsider', icone: 'x', url: 'https://x.com/ShigeryuInsider' },
    { nom: 'YouTube', pseudo: '@Shigeryu', icone: 'youtube', url: 'https://www.youtube.com/@Shigeryu' },
    // itch.io : lien repris à l'identique de l'ancien site (15/10/2026)
    { nom: 'itch.io', pseudo: 'shigeryu.itch.io', icone: 'itch', url: 'https://shigeryu.itch.io/' }
  ],

  contact: { email: 'shigeryustudio@gmail.com', delai: 'Je fais de mon mieux pour répondre sous 48 heures ouvrées.',
             delai_en: 'I do my best to reply within 48 business hours.' }
};
