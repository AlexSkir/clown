export function rgbaToHex(r, g, b) {
  let hexR = r.toString(16);
  let hexG = g.toString(16);
  let hexB = b.toString(16);
  if (hexR.length < 2) {
    hexR = `0${hexR}`;
  }
  if (hexG.length < 2) {
    hexG = `0${hexG}`;
  }
  if (hexB.length < 2) {
    hexB = `0${hexB}`;
  }
  return `#${hexR}${hexG}${hexB}`;
}

export function rgbToHex(color) {
  const hex = `${color}`;

  const nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(hex);
  const r = parseInt(nums[2], 10).toString(16);
  const g = parseInt(nums[3], 10).toString(16);
  const b = parseInt(nums[4], 10).toString(16);

  return `#${r.length === 1 ? `0${r}` : r}${g.length === 1 ? `0${g}` : g}${
    b.length === 1 ? `0${b}` : b
    }`;
}

export function hexToRGB(hexColor) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}