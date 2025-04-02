const bugOptions = document.querySelectorAll(".bug-option");

if (bugOptions.length) {
  bugOptions.forEach(option => {
    option.addEventListener("click", () => {
      const bug = option.getAttribute("data-bug");
      localStorage.setItem("selectedBug", bug);
      window.location.href = "game.html";
    });
  });
}

// Music toggle
const music = document.getElementById('background-music');
function toggleMusic() {
  if (music.paused) music.play();
  else music.pause();
}
