const startButton = document.getElementById("start-button");
const timer = document.getElementById("timer");
let timeLeft = 60; // time left in seconds

startButton.addEventListener("click", () => {
  let countdown = setInterval(() => {
    if (timeLeft > 0) {
      timer.innerHTML = `Time Left: ${timeLeft--} seconds`;
    } else {
      clearInterval(countdown);
      timer.innerHTML = "Time Over";
    }
  }, 1000);
});




