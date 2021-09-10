document.querySelector(".color").addEventListener("input", colorPicker);

function colorPicker() {
  const color = document.querySelector(".color").value;
  console.log(color);
  displayColor(color);
  displayHex(color);
  const rgb = convertToRGB(color);
  displayRGB(rgb);
  const hsl = converToHSL(rgb);
  displayHSL(hsl);
}
function displayColor(color) {
  document.querySelector(".colorbox").style.backgroundColor = color;
}
function displayHex(color) {
  document.querySelector(".hex").innerHTML = "Hex: " + color;
}
function convertToRGB(color) {
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5), 16);

  return { r, g, b };
}
function displayRGB(rgb) {
  document.querySelector(".rgb").innerHTML = `rgb( ${rgb.r}, ${rgb.g}, ${rgb.b} )`;
}
function converToHSL(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
  console.log(rgb);
  r /= 255;
  g /= 255;
  b /= 255;
  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return { h, s, l };
}
function displayHSL(hsl) {
  document.querySelector(".hsl").innerHTML = `HSL: (${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}
