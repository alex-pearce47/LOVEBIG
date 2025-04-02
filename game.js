const garden = document.getElementById("garden");
const messageBox = document.getElementById("message-box");

const bug = localStorage.getItem("selectedBug") || "ladybug";
let posX = 0;
let posY = 0;
const gridSize = 10;

let currentLevel = 1;
let totalHearts = 0;

const messages = [
  "You're blooming with kindness 🌷",
  "You light up this space ✨",
  "You are deeply loved 💖",
  "Keep glowing, gentle soul 🌈",
  "Your presence is pure magic 🌼"
];

const levelCompleteMessages = [
  "Beautiful! You gathered all the love 💗",
  "The garden feels brighter thanks to you 🌸",
  "You're amazing! Onward to more magic ✨",
  "Another step, another smile 😊",
  "Keep shining, lovebug 🌟"
];

const finishMessage = "You’ve filled the whole garden with love 💞 THE END 🌸";

// Level settings: [flowerDensity, heartCount]
const levels = [
  [0.1, 3
