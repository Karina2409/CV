setThemeHTML();

function setThemeHTML() {
  const theme = getTheme();
  document.documentElement.setAttribute('data-theme', theme);
  setButtonThemeText(theme);
}

function changeTheme() {
  let theme = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  setButtonThemeText(theme);
  document.documentElement.setAttribute('data-theme', theme);
}

function setButtonThemeText(theme) {
  const themeButton  = document.querySelector(".theme-button");
  themeButton.textContent = theme === 'dark' ? 'Light' : 'Dark';
}