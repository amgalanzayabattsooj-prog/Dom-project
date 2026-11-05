const panel = document.getElementById("panel");
const icon = document.getElementById("icon");
const firstWord = document.getElementById("first-word");
const secondWord = document.getElementById("second-word");
const msNumber = document.getElementById("ms-number");
const msNumberTwo = document.getElementById("ms-number-two");
const statusEl = document.getElementById("status");

const svg = (inner, strokeWidth) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

const icons = {
  idle: svg('<circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />', 1),
  waiting: svg('<circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" />', 2),
  ready: svg('<path d="M12 4v11" /><circle cx="12" cy="20" r="0.5" fill="currentColor" />', 2),
  success: svg('<path d="M4 12.5l5 5L20 6" />', 2),
  early: svg('<path d="M6 6l12 12M18 6L6 18" />', 2),
};

const themes = {
  idle: { bg: "#27272A", text: "#F4F4F5" },
  waiting: { bg: "#4C0519", text: "#F4F4F5" },
  ready: { bg: "#D9F99D", text: "#09090B" },
  success: { bg: "#27272A", text: "#F4F4F5" },
  early: { bg: "#27272A", text: "#F4F4F5" },
};

let state = "idle";
let timerId = null;
let startTime = 0;
let best = null;

function render(theme, title, subtitle) {
  const { bg, text } = themes[theme];
  panel.style.backgroundColor = bg;
  panel.style.color = text;
  icon.innerHTML = icons[theme];
  icon.style.color = text;
  firstWord.style.color = text;
  secondWord.style.color = text;
  firstWord.textContent = title;
  secondWord.textContent = subtitle;
  statusEl.textContent = `${title}. ${subtitle}`;
}

function startAttempt() {
  state = "waiting";
  render("waiting", "Wait for green", "Not yet. Stay ready.");
  const delay = 1500 + Math.random() * 2500;
  timerId = setTimeout(() => {
    state = "ready";
    startTime = performance.now();
    render("ready", "Click now!", "Go, go, go!");
  }, delay);
}

function tooSoon() {
  clearTimeout(timerId);
  state = "idle";
  render("early", "Too soon", "Click to play again");
}

function finishAttempt() {
  const time = Math.round(performance.now() - startTime);
  state = "idle";
  msNumber.textContent = `${time} ms`;
  if (best === null || time < best) {
    best = time;
    msNumberTwo.textContent = `${best} ms`;
  }
  render("success", `${time} ms`, "Click to play again");
}

render("idle", "Ready when you are", "Click to start");

panel.addEventListener("click", () => {
  if (state === "idle") startAttempt();
  else if (state === "waiting") tooSoon();
  else if (state === "ready") finishAttempt();
});