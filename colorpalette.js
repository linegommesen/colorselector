document.querySelector(".color").addEventListener("input", colorPicker);

//MODEL
function colorPicker() {
  //handle the first color
  const hex = document.querySelector(".color").value;
  displayColor(hex);
  displayHex(hex);

  let rgb = convertToRGB(hex);
  displayRGB(rgb);

  let hsl = converToHSL(rgb);
  displayHSL(hsl);

  //handle the dropdown
  const dropDown = document.querySelector("#colormodes").value;

  //convert to different colormodes depending on the dropdown value
  if (dropDown === "analogous") {
    const analogousColors = convertToAnalogous(hsl);
    displayOtherHSL(analogousColors);
    hslToRGBBackground(analogousColors);
  } else if (dropDown === "monochromatic") {
    const monochromaticColors = convertToMonochromatic(hsl);
    displayOtherHSL(monochromaticColors);
    hslToRGBBackground(monochromaticColors);
  } else if (dropDown === "triad") {
    const triadColors = convertToTriad(hsl);
    displayOtherHSL(triadColors);
    hslToRGBBackground(triadColors);
  } else if (dropDown === "complementary") {
    const complementaryColors = convertToComplementary(hsl);
    displayOtherHSL(complementaryColors);
    hslToRGBBackground(complementaryColors);
  } else if (dropDown === "compound") {
    const compoundColors = convertToCompound(hsl);
    displayOtherHSL(compoundColors);
    hslToRGBBackground(compoundColors);
  } else {
    const shadeColors = convertToShades(hsl);
    displayOtherHSL(shadeColors);
    hslToRGBBackground(shadeColors);
  }
}

//CONTROLLER
//functions converting the first color to hex, rgb and hsl
function convertToRGB(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5), 16);

  return { r, g, b };
}

function converToHSL(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

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

//functions calculating the four other colors and returning array with hsl colors
function convertToAnalogous(hsl) {
  console.log("Calculate Analogous");
  let hslObject = hsl;
  let arrOfColors = [];
  for (let i = 0; i < 4; i++) {
    arrOfColors[i] = Object.assign({}, hslObject);
  }
  arrOfColors[1].h = bringIntoInterval(arrOfColors[1].h + 20, 360);
  arrOfColors[0].h = bringIntoInterval(arrOfColors[0].h + 40, 360);
  arrOfColors[2].h = bringIntoInterval(arrOfColors[2].h + 60, 360);
  arrOfColors[3].h = bringIntoInterval(arrOfColors[3].h + 80, 360);

  return arrOfColors;
}
function convertToMonochromatic(hsl) {
  let hslObject = hsl;
  let arrOfColors = [];
  for (let i = 0; i < 4; i++) {
    arrOfColors[i] = Object.assign({}, hslObject);
  }

  arrOfColors[1].s = bringIntoInterval(arrOfColors[1].s + 20, 100);
  arrOfColors[0].s = bringIntoInterval(arrOfColors[0].s - 20, 100);
  arrOfColors[2].l = bringIntoInterval(arrOfColors[2].l + 20, 100);
  arrOfColors[3].l = bringIntoInterval(arrOfColors[3].l - 20, 100);

  return arrOfColors;
}
function convertToTriad(hsl) {
  let hslObject = hsl;
  let arrOfColors = [];
  for (let i = 0; i < 4; i++) {
    arrOfColors[i] = Object.assign({}, hslObject);
  }

  arrOfColors[1].h = bringIntoInterval(arrOfColors[1].h + 120, 360);
  arrOfColors[0].h = bringIntoInterval(arrOfColors[0].h - 120, 360);
  arrOfColors[2].l = bringIntoInterval(arrOfColors[2].l + 20, 100);
  arrOfColors[3].l = bringIntoInterval(arrOfColors[3].l - 20, 100);

  return arrOfColors;
}
function convertToComplementary(hsl) {
  let hslObject = hsl;
  let arrOfColors = [];
  for (let i = 0; i < 4; i++) {
    arrOfColors[i] = Object.assign({}, hslObject);
  }

  arrOfColors[1].h = bringIntoInterval(arrOfColors[1].h + 60, 360);
  arrOfColors[0].h = bringIntoInterval(arrOfColors[0].h + 180, 360);
  arrOfColors[2].l = bringIntoInterval(arrOfColors[2].l + 20, 100);
  arrOfColors[3].l = bringIntoInterval(arrOfColors[3].l - 20, 100);

  return arrOfColors;
}
function convertToCompound(hsl) {
  let hslObject = hsl;
  let arrOfColors = [];
  for (let i = 0; i < 4; i++) {
    arrOfColors[i] = Object.assign({}, hslObject);
  }

  arrOfColors[1].h = bringIntoInterval(arrOfColors[1].h + 180, 360);
  arrOfColors[0].h = bringIntoInterval(arrOfColors[0].h + 30, 360);
  arrOfColors[2].h = bringIntoInterval(arrOfColors[2].h + 20, 360);
  arrOfColors[3].h = bringIntoInterval(arrOfColors[3].h - 20, 360);

  return arrOfColors;
}
function convertToShades(hsl) {
  let hslObject = hsl;
  let arrOfColors = [];
  for (let i = 0; i < 4; i++) {
    arrOfColors[i] = Object.assign({}, hslObject);
  }

  arrOfColors[1].l = bringIntoInterval(arrOfColors[1].l + 60, 100);
  arrOfColors[0].l = bringIntoInterval(arrOfColors[0].l + 30, 100);
  arrOfColors[2].l = bringIntoInterval(arrOfColors[2].l - 30, 100);
  arrOfColors[3].l = bringIntoInterval(arrOfColors[3].l - 60, 100);

  return arrOfColors;
}

//checking if the hsl values are higher than the max (360 for h, 100 for s+l)
function bringIntoInterval(number, max) {
  while (number < 0) {
    number += max;
  }
  return number % max;
}

//VIEW
//functions displaying color1 + hex, rgb and hsl names for color1
function displayColor(hex) {
  document.querySelector(".colorbox3").style.backgroundColor = hex;
}
function displayHex(color) {
  document.querySelector(".hex3").innerHTML = "Hex: " + color;
}
function displayRGB(rgb) {
  let rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  document.querySelector(".rgb3").innerHTML = `RGB: ( ${rgbString} )`;
}
function displayHSL(hsl) {
  document.querySelector(".hsl3").innerHTML = `HSL: (${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

//functions displaying the four other colors and the hsl names for these colors.
function displayOtherHSL(arrOfColors) {
  document.querySelector(".hsl1").innerHTML = `HSL: (${arrOfColors[0].h}, ${arrOfColors[0].s}%, ${arrOfColors[0].l}%)`;
  document.querySelector(".hsl2").innerHTML = `HSL: (${arrOfColors[1].h}, ${arrOfColors[1].s}%, ${arrOfColors[1].l}%)`;
  document.querySelector(".hsl4").innerHTML = `HSL: (${arrOfColors[2].h}, ${arrOfColors[2].s}%, ${arrOfColors[2].l}%)`;
  document.querySelector(".hsl5").innerHTML = `HSL: (${arrOfColors[3].h}, ${arrOfColors[3].s}%, ${arrOfColors[3].l}%)`;
}
function hslToRGBBackground(arrOfColors) {
  console.log(arrOfColors);
  document.querySelector(".colorbox1").style.backgroundColor = `hsl(${arrOfColors[0].h}, ${arrOfColors[0].s}%, ${arrOfColors[0].l}%)`;
  document.querySelector(".colorbox2").style.backgroundColor = `hsl(${arrOfColors[1].h}, ${arrOfColors[1].s}%, ${arrOfColors[1].l}%)`;
  document.querySelector(".colorbox4").style.backgroundColor = `hsl(${arrOfColors[2].h}, ${arrOfColors[2].s}%, ${arrOfColors[2].l}%)`;
  document.querySelector(".colorbox5").style.backgroundColor = `hsl(${arrOfColors[3].h}, ${arrOfColors[3].s}%, ${arrOfColors[3].l}%)`;
}
