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

const socials = document.querySelectorAll('.about-me__social');

const amplitudes = 10;
const basePositions = Array.from(socials).map(el => el.offsetTop);
let angle = 0;

function animateSocial() {
  angle += 0.01;

  socials.forEach((social, index) => {
    const baseTop = basePositions[index];
    const offsetY = Math.sin(angle + index) * amplitudes;

    social.style.top = `${baseTop + offsetY}px`;
  });

  requestAnimationFrame(animateSocial);
}

animateSocial();