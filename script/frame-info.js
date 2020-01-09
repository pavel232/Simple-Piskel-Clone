/* eslint-disable import/prefer-default-export */

const framesInfo = document.getElementById('framesInfo');

export function setFrameInfo(width, x, y) {
  if (x >= 0 && y >= 0) {
    framesInfo.innerHTML = `[${width}x${width}] ${x + 1}:${y + 1}`;
  }
}
