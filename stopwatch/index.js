const resetButton = document.getElementById("reset-button");
const stopButton = document.getElementById("pause-button");
const startButton = document.getElementById("start-button");
const displaySecond = document.getElementById("seconds");
const displayMinute = document.getElementById("minutes");
const displayHour = document.getElementById("hours");
const state = document.getElementById("state");

let intervalid;
let startTime = 0;

const formatTime = (startTime) => {
  const seconds = Math.floor(startTime % 60)
    .toString()
    .padStart(2, "0");

  const minutes = Math.floor((startTime % 3600) / 60)
    .toString()
    .padStart(2, "0");

  const hours = Math.floor(startTime / 3600)
    .toString()
    .padStart(2, "0");

  displayHour.textContent = hours;
  displayMinute.textContent = minutes;
  displaySecond.textContent = seconds;
};

const startTimer = () => {
  intervalid = setInterval(() => {
    startTime++;
    formatTime(startTime);
  }, 1000);

  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
  state.textContent = "Running";
};

const resetTimer = () => {
  clearInterval(intervalid);

  startTime = 0;
  formatTime(startTime);

  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  state.textContent = "Ready";
  startButton.textContent = "Start";
};

const stopTimer = () => {
  clearInterval(intervalid);

  startButton.disabled = false;
  stopButton.disabled = true;
  state.textContent = "Paused";
  startButton.textContent = "Resume";
};

stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
startButton.addEventListener("click", startTimer);
