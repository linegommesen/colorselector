document.querySelector(".color").addEventListener("input", colorPicker);

function colorPicker() {
  const hex = document.querySelector(".color").value;
  document.querySelector(".colorbox").style.backgroundColor = hex;
  displayHex(hex);
}
function displayHex(hex) {
  document.querySelector(".hex").innerHTML = "Hex: " + hex;
  displayRGB(hex);
}
function displayRGB(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5), 16);
  document.querySelector(".rgb").innerHTML = "RGB: " + r + " " + g + " " + b;
  displayHSL(r, g, b);
}
function displayHSL(r, g, b) {
  console.log(r, g, b);
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

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  document.querySelector(".hsl").innerHTML = `HSL: ${h}, ${s}%, ${l}%`;
}
