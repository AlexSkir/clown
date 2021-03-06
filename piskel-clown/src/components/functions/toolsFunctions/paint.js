import { hexToRGB } from 'components/functions/colors';

function getColorAtPixel(imageData, x, y) {
  const { width, data } = imageData;

  return {
    r: data[4 * (width * y + x) + 0],
    g: data[4 * (width * y + x) + 1],
    b: data[4 * (width * y + x) + 2],
    a: data[4 * (width * y + x) + 3]
  };
}

function setColorAtPixel(imageData, color, x, y) {
  const { width, data } = imageData;

  data[4 * (width * y + x) + 0] = color.r;
  data[4 * (width * y + x) + 1] = color.g;
  data[4 * (width * y + x) + 2] = color.b;
  data[4 * (width * y + x) + 3] = color.a;
}

function colorMatch(a, b) {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
}

function floodFill(imageData, newColor, x, y) {
  const { width, height } = imageData;
  const stack = [];
  const baseColor = getColorAtPixel(imageData, x, y);
  let clicked = { x, y };

  // Check if base color and new color are the same
  if (colorMatch(baseColor, newColor)) {
    return;
  }

  // Add the clicked location to stack
  stack.push({ x: clicked.x, y: clicked.y });

  while (stack.length) {
    clicked = stack.pop();
    let goDown = true; // Vertical is assumed to be true
    let goUp = true; // Vertical is assumed to be true
    let goLeft = false;
    let goRight = false;

    // Move to top most goDown pixel
    while (goUp && clicked.y >= 0) {
      clicked.y -= 1;
      goUp = colorMatch(getColorAtPixel(imageData, clicked.x, clicked.y), baseColor);
    }

    // Move downward
    while (goDown && clicked.y < height) {
      setColorAtPixel(imageData, newColor, clicked.x, clicked.y);

      // Check left
      if (
        clicked.x - 1 >= 0 &&
        colorMatch(getColorAtPixel(imageData, clicked.x - 1, clicked.y), baseColor)
      ) {
        if (!goLeft) {
          goLeft = true;
          stack.push({ x: clicked.x - 1, y: clicked.y });
        }
      } else {
        goLeft = false;
      }

      // Check right
      if (
        clicked.x + 1 < width &&
        colorMatch(getColorAtPixel(imageData, clicked.x + 1, clicked.y), baseColor)
      ) {
        if (!goRight) {
          stack.push({ x: clicked.x + 1, y: clicked.y });
          goRight = true;
        }
      } else {
        goRight = false;
      }

      clicked.y += 1;
      goDown = colorMatch(getColorAtPixel(imageData, clicked.x, clicked.y), baseColor);
    }
  }
}

export default function paintIt(e, num, color) {
  const curCanv = document.querySelector(`#canvas${num}`);
  const ctx = curCanv.getContext('2d');
  const rgbColor = hexToRGB(color);
  const col = { r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, a: 255 };
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  const rect = curCanv.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);
  const imageData = ctx.getImageData(0, 0, curCanv.width, curCanv.height);
  floodFill(imageData, col, x, y);
  ctx.putImageData(imageData, 0, 0);
}
