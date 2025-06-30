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
  const themeButton = document.querySelector(".theme-button");
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

const container = document.querySelector('.soft-skills__container');
const items = document.querySelectorAll('.soft-skills__item');
const itemSize = 100;
const speed = 0.5;

const balls = [];

items.forEach((el) => {
  let X, Y;
  let tries = 0;
  const maxTries = 100;

  let overlapping;

  do {
    X = Math.random() * (container.clientWidth - itemSize);
    Y = Math.random() * (container.clientHeight - itemSize);

    overlapping = balls.some((b) => {
      const dx = b.x - X;
      const dy = b.y - Y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < itemSize;
    });

    tries++;
  } while (overlapping && tries < maxTries);

  const angle = Math.random() * 2 * Math.PI;
  const dx = Math.cos(angle) * speed;
  const dy = Math.sin(angle) * speed;

  el.style.left = `${X}px`;
  el.style.top = `${Y}px`;

  balls.push({ el, x: X, y: Y, dx, dy });
})

function detectCollision(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < itemSize;
}

function resolveCollision(a, b) {
  const tempDx = a.dx;
  const tempDy = a.dy;
  a.dx = b.dx;
  a.dy = b.dy;
  b.dx = tempDx;
  b.dy = tempDy;

  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const overlap = itemSize - distance;
  if (overlap > 0) {
    const halfOverlap = overlap / 2;
    const offsetX = (dx / distance) * halfOverlap;
    const offsetY = (dy / distance) * halfOverlap;

    a.x -= offsetX;
    a.y -= offsetY;
    b.x += offsetX;
    b.y += offsetY;

    // Обновляем позиции DOM-элементов
    a.el.style.left = `${a.x}px`;
    a.el.style.top = `${a.y}px`;
    b.el.style.left = `${b.x}px`;
    b.el.style.top = `${b.y}px`;
  }
}

function animateSoftSkills() {
  balls.forEach((ball) => {
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.x < 0 || ball.x >= container.clientWidth - itemSize) {
      ball.dx *= -1;
      ball.x = Math.max(0, Math.min(ball.x, container.clientWidth - itemSize));
    }
    if (ball.y <= 0 || ball.y >= container.clientHeight - itemSize) {
      ball.dy *= -1;
      ball.y = Math.max(0, Math.min(ball.y, container.clientHeight - itemSize));
    }
    ball.el.style.left = `${ball.x}px`;
    ball.el.style.top = `${ball.y}px`;
  })

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (detectCollision(balls[i], balls[j])) {
        resolveCollision(balls[i], balls[j]);
      }
    }
  }

  requestAnimationFrame(animateSoftSkills);
}

animateSocial();
animateSoftSkills();