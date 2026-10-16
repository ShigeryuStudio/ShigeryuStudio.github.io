(function (html) {
  html.classList.add('js');
  var anglais = false;
  try { anglais = window.localStorage.getItem('shigeryu-langue') === 'en'; } catch (e) {}
  if (anglais) {
    html.lang = 'en';
    html.classList.add('i18n-attente');
    setTimeout(function () {
      html.classList.remove('i18n-attente');
      if (!html.classList.contains('i18n-ok')) html.lang = 'fr';   // traduction impossible : la page reste en français
    }, 1200);
  }
})(document.documentElement);
