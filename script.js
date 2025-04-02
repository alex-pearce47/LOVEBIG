// Character selection
const snailOptions = document.querySelectorAll(".snail-option");

if (snailOptions.length) {
  snailOptions.forEach(option => {
    option.addEventListener("click", () => {
      const snail = option.getAttribute("data-snail");
      localStorage.setItem("selectedSnail", snail);
      alert(`You're as bright as the morning dew, little ${snail} snail!`);
      window.location.href = "game.html";
    });
  });
}

// Music toggle
const music = document.getElementById('background-music');

function toggleMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}
