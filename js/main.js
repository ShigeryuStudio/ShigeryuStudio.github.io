/**
 * Shigeryu Studio — main.js
 *
 * Responsabilités :
 *   - Système i18n léger (traductions embarquées, pas de fetch)
 *   - Sélecteur de langue EN / FR
 *   - Auto-détection de la langue du navigateur
 *
 * Ajouter une langue : dupliquer un bloc dans TRANSLATIONS,
 * puis ajouter le bouton correspondant dans index.html.
 */

/* ── Traductions ────────────────────────────────────────────── */
const TRANSLATIONS = {

  en: {
    /* Meta */
    "meta.title": "Shigeryu Studio — Independent Game & App Studio",
    "meta.description": "Shigeryu Studio — Independent game and app studio. Fractal Snake, WiiU GamePad Overlay, and more coming soon.",

    /* Nav */
    "nav.home": "Shigeryu Studio",

    /* Hero */
    "hero.label":   "Independent Studio",
    "hero.title":   "Shigeryu <span class=\"accent\">Studio</span>",
    "hero.uc":      "🚧 Website Under Construction 🚧",
    "hero.desc":    "I design games, tools, and digital experiences with a creative approach. New projects are coming soon.",
    "hero.github":  "GitHub",
    "hero.contact": "Contact",

    /* Projects */
    "projects.title":    "Current Projects",
    "projects.subtitle": "What I'm working on right now.",

    "project.fs.title": "Fractal Snake",
    "project.fs.desc":  "Classic snake reinvented in 3D on a Menger sponge. Three game modes + real-time Online Versus.",
    "project.fs.link":  "Google Play →",

    "project.wiiu.title": "WiiU GamePad Overlay",
    "project.wiiu.desc":  "Use your PC screen as a WiiU GamePad display. Lightweight overlay compatible with Cemu.",
    "project.wiiu.link":  "View on itch.io →",

    /* Footer */
    "footer.brand": "Shigeryu Studio",
    "footer.copy":  "© 2024–2026 Shigeryu Studio — All rights reserved.",
    "footer.github": "GitHub",
    "footer.contact": "Contact",
  },

  fr: {
    /* Meta */
    "meta.title": "Shigeryu Studio — Studio Indépendant Jeux & Applications",
    "meta.description": "Shigeryu Studio — Studio indépendant. Fractal Snake, WiiU GamePad Overlay, et bien d'autres projets à venir.",

    /* Nav */
    "nav.home": "Shigeryu Studio",

    /* Hero */
    "hero.label":   "Studio Indépendant",
    "hero.title":   "Shigeryu <span class=\"accent\">Studio</span>",
    "hero.uc":      "🚧 Site en construction 🚧",
    "hero.desc":    "Je conçois des jeux, des outils et des expériences numériques avec une approche créative. De nouveaux projets arrivent bientôt.",
    "hero.github":  "GitHub",
    "hero.contact": "Contact",

    /* Projects */
    "projects.title":    "Projets en cours",
    "projects.subtitle": "Ce sur quoi je travaille actuellement.",

    "project.fs.title": "Fractal Snake",
    "project.fs.desc":  "Le snake classique réinventé en 3D sur une éponge de Menger. Trois modes de jeu + Versus en ligne en temps réel.",
    "project.fs.link":  "Google Play →",

    "project.wiiu.title": "WiiU GamePad Overlay",
    "project.wiiu.desc":  "Utilisez votre écran PC comme affichage GamePad WiiU. Overlay léger compatible avec l'émulateur Cemu.",
    "project.wiiu.link":  "Voir sur itch.io →",

    /* Footer */
    "footer.brand": "Shigeryu Studio",
    "footer.copy":  "© 2024–2026 Shigeryu Studio — Tous droits réservés.",
    "footer.github": "GitHub",
    "footer.contact": "Contact",
  }

};

/* ── i18n core ──────────────────────────────────────────────── */
const I18n = (() => {
  const SUPPORTED = ['en', 'fr'];
  const DEFAULT   = 'en';
  const LS_KEY    = 'ss-lang';

  let _lang = DEFAULT;

  /** Détecte la langue préférée (localStorage → navigateur → défaut) */
  function _detect() {
    const stored = localStorage.getItem(LS_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : DEFAULT;
  }

  /** Traduit une clé */
  function _t(key) {
    return TRANSLATIONS[_lang]?.[key] ?? TRANSLATIONS[DEFAULT]?.[key] ?? key;
  }

  /** Applique les traductions dans le DOM */
  function _apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key  = el.dataset.i18n;
      const attr = el.dataset.i18nAttr;
      const val  = _t(key);
      if (attr) {
        el.setAttribute(attr, val);
      } else {
        el.innerHTML = val;
      }
    });
    document.documentElement.lang = _lang;

    // Mettre à jour document.title
    const titleKey = _t('meta.title');
    if (titleKey) document.title = titleKey;

    // Mettre à jour la meta description
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', _t('meta.description'));

    // Mettre à jour les boutons de langue
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.langBtn === _lang);
    });
  }

  return {
    get lang()     { return _lang; },
    t(key)         { return _t(key); },

    init() {
      _lang = _detect();
      _apply();
    },

    setLang(lang) {
      if (!SUPPORTED.includes(lang)) return;
      _lang = lang;
      localStorage.setItem(LS_KEY, lang);
      _apply();
    }
  };
})();

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  I18n.init();

  // Câbler les boutons de langue
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => I18n.setLang(btn.dataset.langBtn));
  });
});
