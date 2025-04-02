const messages = [
  "You are blooming beautifully.",
  "Your smile lights up the world.",
  "You are exactly where you need to be.",
  "Kindness is your superpower!",
  "You are loved, always."
];

function revealMessage(element) {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  element.innerText = randomMessage;
  element.style.fontSize = "1.2em";
}

function getRandomQuote() {
  const quote = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("snail-message").innerText = quote;
}
const music = document.getElementById('background-music');

function toggleMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}
