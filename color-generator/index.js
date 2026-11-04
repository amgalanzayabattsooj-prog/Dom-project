const colors = document.getElementById("colors");
const statusElements = document.getElementById("status");
const shufflePalettes = document.getElementById("shuffle-colors");

const defaultStatus = "6 palettes . 60 shades. Click to copy a HEX background color";
let statusTimer;

const lightness = [94, 86, 76, 64, 52, 43, 35, 27, 20, 12];
const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const families = [
  { name: "red", hue: 0, saturation: 85 },
  { name: "lime", hue: 82, saturation: 76 },
  { name: "sky", hue: 199, saturation: 90 },
  { name: "gray", hue: 220, saturation: 9 },
  { name: "zinc", hue: 240, saturation: 5 },
  { name: "stone", hue: 30, saturation: 6 },
  { name: "teal", hue: 174, saturation: 72 },
  { name: "cyan", hue: 189, saturation: 86 },
  { name: "blue", hue: 217, saturation: 88 },
  { name: "pink", hue: 330, saturation: 80 },
  { name: "rose", hue: 347, saturation: 86 },
  { name: "neutral", hue: 0, saturation: 0 },
  { name: "amber", hue: 40, saturation: 94 },
  { name: "orange", hue: 25, saturation: 92 },
  { name: "yellow", hue: 52, saturation: 90 },
  { name: "green", hue: 142, saturation: 68 },
  { name: "slate", hue: 215, saturation: 20 },
  { name: "indigo", hue: 239, saturation: 80 },
  { name: "violet", hue: 258, saturation: 84 },
  { name: "purple", hue: 271, saturation: 82 },
  { name: "emerald", hue: 160, saturation: 76 },
  { name: "fuchsia", hue: 292, saturation: 82 },
];

let selectedFamilies = ["red", "amber", "emerald", "sky", "violet", "pink"].map((name) =>
  families.find((family) => name === family.name)
);

const hslToHex = ({ hue, saturation, lightness }) => {
  const l = lightness / 100;
  const s = saturation / 100;
  const amplitude = s * Math.min(l, 1 - l);

  const channel = (offset) => {
    const position = (offset + hue / 30) % 12;
    const value = l - amplitude * Math.max(-1, Math.min(position - 3, 9 - position, 1));
    return Math.round(255 * value)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase();
};

colors.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-hex]");

  if (!button) return;

  const hex = button.dataset.hex;

  try {
    await navigator.clipboard.writeText(hex);
    statusElements.textContent = `${hex} is copied`;
  } catch {
    statusElements.textContent = "Copy failed";
  }

  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => {
    statusElements.textContent = defaultStatus;
  }, 2000);
});

const renderColors = () => {
  colors.innerHTML = selectedFamilies
    .map(({ name, hue, saturation }) => {
      const colorButtons = shades
        .map((shade, index) => {
          const hex = hslToHex({ hue, saturation, lightness: lightness[index] });

          return `<div class="w-[113.2px] h-[107px] flex flex-col items-center justify-center">
                    <button data-hex="${hex}" style="background-color: ${hex}" class="w-[113.2px] h-[64px] rounded-[12px]"></button>
                    <div class="flex flex-col justify-center items-center w-[38px] h-[43px]">
                      <span class="text-[12px] font-medium text-[#D4D4D8]">${shade}</span>
                      <span class="font-mono text-[9px] text-[#A1A1AA]">${hex}</span>
                    </div>
                  </div>`;
        })
        .join("");

      return `<div>
                <div class="w-full flex flex-col gap-[12px]">
                  <div class="font-semibold capitalize text-[14px]">${name}</div>
                  <div class="flex gap-3">${colorButtons}</div>
                </div>
              </div>`;
    })
    .join("");
};

shufflePalettes.addEventListener("click", () => {
  const remaining = [...families];
  selectedFamilies = [];

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    selectedFamilies.push(remaining.splice(randomIndex, 1)[0]);
  }

  renderColors();
});

renderColors();