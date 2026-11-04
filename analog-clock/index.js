const markers = document.getElementById("markers");
const numbers = document.getElementById("numbers");

const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");

for (let i = 0; i < 60; i++) {
  const marker = document.createElement("div");
  marker.className = "absolute inset-0";
  marker.style.transform = `rotate(${i * 6}deg)`;

  const tick = document.createElement("span");
  const tickType = i % 5 === 0 ? "w-0.5 h-3 bg-gray-600" : "w-px h-1.5 bg-gray-300";

  tick.className = `absolute top-2 left-1/2 -translate-x-1/2 ${tickType}`;

  marker.appendChild(tick);
  markers.appendChild(marker);
}

for (let i = 1; i <= 12; i++) {
  const number = document.createElement("span");
  const angle = [i * Math.PI] / 6;
  number.textContent = i;

  number.className = "absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${tickType}";

  number.style.left = `${50 + 39 * Math.sin(angle)}%`;
  number.style.top = `${50 - 39 * Math.cos(angle)}%`;

  numbers.appendChild(number);
}

const runtime = () => {
  const now = new Date();
  const ms = now.getMilliseconds();
  const seconds = now.getSeconds() + ms / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = now.getHours() + minutes / 60;

  hourHand.style.transform = `rotate(${(hours % 12) * 30}deg)`;
  minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
  secondHand.style.transform = `rotate(${seconds * 6}deg)`;

  requestAnimationFrame(runtime)
};

runtime();

