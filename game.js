const garden = document.getElementById("garden");
const messageBox = document.getElementById("message-box");

const bug = localStorage.getItem("selectedBug") || "ladybug";
let posX = 0;
let posY = 0;

const messages = [
  "You're blooming with kindness 🌷",
  "Your light is contagious ☀️",
  "You are so loved 💗",
  "Keep going, beautiful soul 🌸",
  "Your joy is a gift to the world 🌼"
];

const gardenRows = 10;
const gardenCols = 10;

// Create garden grid
for (let y = 0; y < gardenRows; y++) {
  for (let x = 0; x < gardenCols; x++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.x = x;
    tile.dataset.y = y;

    // Add flowers as background
    if (Math.random() < 0.3) tile.classList.add("flower");

    // Add hearts to collect
    if (Math.random() < 0.1) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      tile.appendChild(heart);
    }

    garden.appendChild(tile);
  }
}

// Place bug character
function drawBug() {
  document.querySelectorAll(".tile").forEach(tile => {
    tile.classList.remove("bug");
    tile.innerHTML = tile.querySelector(".heart") ? "💗" : "";
  });

  const currentTile = document.querySelector(`.tile[data-x="${posX}"][data-y="${posY}"]`);
  currentTile.classList.add("bug");
  currentTile.innerHTML = getBugEmoji();
}

function getBugEmoji() {
  switch (bug) {
    case "ladybug": return "🐞";
    case "butterfly": return "🦋";
    case "bee": return "🐝";
    case "snail": return "🐌";
    default: return "🐞";
  }
}

function checkHeart() {
  const tile = document.querySelector(`.tile[data-x="${posX}"][data-y="${posY}"]`);
  if (tile && tile.querySelector(".heart")) {
    tile.querySelector(".heart").remove();
    const message = messages[Math.floor(Math.random() * messages.length)];
    messageBox.innerText = message;
    messageBox.style.opacity = 1;
    setTimeout(() => {
      messageBox.style.opacity = 0;
    }, 3000);
  }
}

function move(dx, dy) {
  const newX = posX + dx;
  const newY = posY + dy;

  if (newX >= 0 && newX < gardenCols && newY >= 0 && newY < gardenRows) {
    posX = newX;
    posY = newY;
    drawBug();
    checkHeart();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") move(0, -1);
  if (e.key === "ArrowDown") move(0, 1);
  if (e.key === "ArrowLeft") move(-1, 0);
  if (e.key === "ArrowRight") move(1, 0);
});

// Touch controls (basic swipe)
let startX, startY;
document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});
document.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;
  if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : -1, 0);
  else move(dy > 0 ? 0 : -1, dy > 0 ? 1 : -1);
});

// Music toggle
const music = document.getElementById('background-music');
function toggleMusic() {
  if (music.paused) music.play();
  else music.pause();
}

drawBug();
