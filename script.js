setTheme();

function setTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
}

function changeTheme() {
  let theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    theme = 'light';
  } else {
    theme = 'dark';
  }
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}