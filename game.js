const garden = document.getElementById('garden');
const snail = document.getElementById('snail');
const messageBox = document.getElementById('message-box');

// Load the selected snail
const snailColor = localStorage.getItem('selectedSnail') || 'pink';
snail.classList.add(snailColor);

// Set initial position
let posX = 100;
let posY = 100;
updateSnailPosition();

// Move snail with arrow keys
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp': posY -= 10; break;
    case 'ArrowDown': posY += 10; break;
    case 'ArrowLeft': posX -= 10; break;
    case 'ArrowRight': posX += 10; break;
  }
  updateSnailPosition();
  checkCollision();
});

// Swipe support for mobile
let startX, startY;
document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;

  if (Math.abs(dx) > Math.abs(dy)) {
    dx > 0 ? posX += 10 : posX -= 10;
  } else {
    dy > 0 ? posY += 10 : posY -= 10;
  }

  updateSnailPosition();
  checkCollision();
});

// Create flowers
const messages = [
  "You’re blooming perfectly 🌷",
  "You’re loved, just as you are 💗",
  "You light up the garden ☀️",
  "You matter so much 🌸",
  "You're a gentle joy 💖"
];

function createFlower() {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  flower.style.top = Math.random() * 300 + 'px';
  flower.style.left = Math.random() * 300 + 'px';
  garden.appendChild(flower);
}

for (let i = 0; i < 5; i++) createFlower();

// Update snail's position
function updateSnailPosition() {
  snail.style.left = posX + 'px';
  snail.style.top = posY + 'px';
}

// Check collision with flowers
function checkCollision() {
  const flowers = document.querySelectorAll('.flower');
  flowers.forEach(flower => {
    const rect1 = snail.getBoundingClientRect();
    const rect2 = flower.getBoundingClientRect();

    if (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    ) {
      const message = messages[Math.floor(Math.random() * messages.length)];
      messageBox.innerText = message;
      flower.remove();
    }
  });
}

// Music toggle (copied from index)
const music = document.getElementById('background-music');
function toggleMusic() {
  if (music.paused) music.play();
  else music.pause();
}
