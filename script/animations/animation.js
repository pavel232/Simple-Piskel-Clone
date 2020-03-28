import { getFramesDataArray } from '../frames/frames.js';
import { fullScreen } from './fullscreen.js';

const animationCanvas = document.getElementById('animationCanvas');
const ctxAnimation = animationCanvas.getContext('2d');

const fullScreenButton = document.getElementById('fullScreenButton');
const slider = document.getElementById('slider');
const fpsText = document.getElementById('fpsText');

export let fps = slider.value;
let currentFrame = 0;

let width = 128;
let height = 128;


// play animation from buffer
animationCanvas.width = width;
animationCanvas.height = height;

function animation() {
  const framesArray = getFramesDataArray();

  if (currentFrame >= framesArray.length) {
    currentFrame = 0;
  }

  const data = framesArray[currentFrame];
  if (framesArray.length !== 0) {
    ctxAnimation.putImageData(data, 0, 0);
  }

  currentFrame += 1;
}

// animation interval
let animationId = setInterval(() => {
  if (fps === '0') {
    clearInterval(animationId);
  } animation();
}, Math.floor(1000 / fps));


// change fps
function setFps(value) {
  fps = value;
  slider.value = fps;
  fpsText.innerHTML = `${fps} fps`;

  clearInterval(animationId);

  animationId = setInterval(() => {
    if (fps === '0') {
      clearInterval(animationId);
    } animation();
  }, Math.floor(1000 / fps));
}

slider.addEventListener('input', () => {
  setFps(slider.value);
});


// set animation canvas resolution
export function setAnimationSize(w, h) {
  width = w;
  height = h;
  animationCanvas.width = width;
  animationCanvas.height = height;
}


// load frames canvas imageData to buffer
export function loadAnimationBuffer(data) {
  if (fps === '0') {
    ctxAnimation.putImageData(data, 0, 0);
  }
}


// fullscreen api from http://qnimate.com/full-screen-api-tutorial-with-demo/
fullScreenButton.addEventListener('click', () => {
  fullScreen();
});


// local storage save & load
function localStorageSave() {
  localStorage.setItem('fps', fps);
}

function localStorageLoad() {
  if(localStorage.getItem('fps')) {
    setFps(localStorage.getItem('fps'));
  }
}

window.addEventListener('beforeunload', () => {
  localStorageSave();
});

localStorageLoad();
