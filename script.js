// Character selection for index.html
const snailOptions = document.querySelectorAll(".snail-option");

if (snailOptions.length) {
  snailOptions.forEach(option => {
    option.addEventListener("click", () => {
      const snail = option.getAttribute("data-snail");
      localStorage.setItem("selectedSnail", snail);
      window.location.href = "game.html";
    });
  });
}

// Music toggle (shared by both index and game)
const music = document.getElementById('background-music');
function toggleMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}
