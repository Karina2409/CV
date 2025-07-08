function getTheme() {
  return localStorage.getItem("theme") || 'light';
}

function setTheme(theme) {
  localStorage.setItem('theme', theme);
}