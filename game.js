const garden = document.getElementById("garden");
const messageBox = document.getElementById("message-box");

const bug = localStorage.getItem("selectedBug") || "ladybug";
let posX = 0;
let posY = 0;
const gridSize = 10;

const messages = [
  "You're blooming with kindness 🌷",
  "Your light is contagious ☀️",
  "You are so loved 💗",
  "Keep going, beautiful soul 🌸",
  "Your joy is a gift to the world 🌼"
];

const finishMessage = "You collected all the love! 💖✨ You’re amazing.";

const gardenGrid = [];
let totalHearts = 0;

// Initialize garden grid
for (let y = 0; y < gridSize; y++) {
  gardenGrid[y] = [];
  for (let x = 0; x < gridSize; x++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.x = x;
    tile.dataset.y = y;

    const cell = {
      element: tile,
      isFlower: false,
      hasHeart: false,
    };

    // Randomly add flowers (obstacles)
    if (Math.random() < 0.2 && !(x === 0 && y === 0)) {
      tile.classList.add("flower");
      cell.isFlower = true;
    }

    // Randomly add hearts (only if it's not a flower)
    if (!cell.isFlower && Math.random() < 0.1 && !(x === 0 && y === 0)) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerText = "💗";
      tile.appendChild(heart);
      cell.hasHeart = true;
      totalHearts++;
    }

    gardenGrid[y][x] = cell;
    garden.appendChild(tile);
  }
}

// Draw the bug character
function drawBug() {
  // Clear all bugs from tiles
  garden.querySelectorAll(".tile").forEach(tile => tile.innerHTML = "");

  const cell = gardenGrid[posY][posX];
  const bugEmoji = getBugEmoji();

  const bugIcon = document.createElement("div");
  bugIcon.innerText = bugEmoji;
  bugIcon.classList.add("bug-icon");

  cell.element.appendChild(bugIcon);

  // If heart exists here
  if (cell.hasHeart) {
    cell.hasHeart = false;
    totalHearts--;

    const message = messages[Math.floor(Math.random() * messages.length)];
    messageBox.innerText = message;
    messageBox.style.opacity = 1;

    setTimeout(() => {
      messageBox.style.opacity = 0;
    }, 3000);
  }

  // If all hearts are collected
  if (totalHearts === 0) {
    setTimeout(() => {
      messageBox.innerText = finishMessage;
      messageBox.style.opacity = 1;
    }, 500);
  }
}

// Get bug emoji
function getBugEmoji() {
  switch (bug) {
    case "ladybug": return "🐞";
    case "butterfly": return "🦋";
    case "bee": return "🐝";
    case "snail": return "🐌";
    default: return "🐞";
  }
}

// Handle movement
function move(dx, dy) {
  const newX = posX + dx;
  const newY = posY + dy;

  if (
    newX >= 0 && newX < gridSize &&
    newY >= 0 && newY < gridSize &&
    !gardenGrid[newY][newX].isFlower
  ) {
    posX = newX;
    posY = newY;
    drawBug();
  }
}

// Arrow keys
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") move(0, -1);
  if (e.key === "ArrowDown") move(0, 1);
  if (e.key === "ArrowLeft") move(-1, 0);
  if (e.key === "ArrowRight") move(1, 0);
});

// Touch swipe
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
const music = document.getElementById("background-music");
function toggleMusic() {
  if (music.paused) music.play();
  else music.pause();
}

drawBug();
