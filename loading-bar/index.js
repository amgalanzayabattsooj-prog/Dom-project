const counter = document.getElementById("counter");
const messege = document.getElementById("messeges");
const loadingBar = document.getElementById("loadingBar");

let startTime = null;
const LOADING_DURATION_MS = 5000;
const messeges = ["Preparing your space", "Bringing everything together", "Adding the finishing touches", "All set. Welcome in!"];

const renderProcess = (percentage) => {
  const roundedPercentage = Math.floor(percentage);
  const currentMessege = roundedPercentage >= 100 ? 3 : roundedPercentage >= 80 ? 2 : roundedPercentage >= 35 ? 1 : 0;

  counter.textContent = roundedPercentage;
  loadingBar.style.width = `${roundedPercentage}%`;

  messege.textContent = messeges[currentMessege];
};

const updateProcess = (timestamp) => {
  if (!startTime) startTime = timestamp;

  const percentage = Math.min(((timestamp - startTime) / LOADING_DURATION_MS) * 100, 100);

  renderProcess(percentage);

  if (percentage < 100) {
    requestAnimationFrame(updateProcess);
  }
};

requestAnimationFrame(updateProcess);
