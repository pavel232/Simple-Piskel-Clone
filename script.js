import { drawFrame, setFrameSize } from './script/frames/frames.js';
import { setAnimationSize, loadAnimationBuffer } from './script/animations/animation.js';
import { setFrameInfo } from './script/frame-info.js';

// initialize variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let canvasBuffer;
canvas.oncontextmenu = () => false;

const bucket = document.getElementById('bucket');
const chooseColor = document.getElementById('chooseColor');
const pencil = document.getElementById('pencil');
const erase = document.getElementById('erase');
const line = document.getElementById('line');
const penSize1 = document.getElementById('penSize1');
const penSize2 = document.getElementById('penSize2');
const penSize3 = document.getElementById('penSize3');
const penSize4 = document.getElementById('penSize4');
const penSizeCurrent = document.getElementById('penSizeCurrent');
const primaryColorButton = document.getElementById('primaryColorButton');
const secondaryColorButton = document.getElementById('secondaryColorButton');
const swapColors = document.getElementById('swapColors');
const res32 = document.getElementById('res32');
const res64 = document.getElementById('res64');
const res128 = document.getElementById('res128');

let primaryColor =  primaryColorButton.value;
let secondaryColor = secondaryColorButton.value;
let currentInstrument = 'pencil';

// canvas size
let width = 128;
let height = 128;
let pixelSize = 4;
let penSize = 1;


// select instrument, resolution and get selected
pencil.addEventListener('click', () => selectItem('instrument-set', pencil));
line.addEventListener('click', () => selectItem('instrument-set', line));
erase.addEventListener('click', () => selectItem('instrument-set', erase));
bucket.addEventListener('click', () => selectItem('instrument-set', bucket));
chooseColor.addEventListener('click', () => selectItem('instrument-set', chooseColor));
penSize1.addEventListener('click', () => setPenSize(1));
penSize2.addEventListener('click', () => setPenSize(2));
penSize3.addEventListener('click', () => setPenSize(3));
penSize4.addEventListener('click', () => setPenSize(4));

res32.addEventListener('click', () => {
  selectItem('settings__resolution', res32);
  setCanvasResolution(32);
});
res64.addEventListener('click', () => {
  selectItem('settings__resolution', res64);
  setCanvasResolution(64);
});
res128.addEventListener('click', () => {
  selectItem('settings__resolution', res128);
  setCanvasResolution(128);
});

function setCanvasResolution(resolution) {
  width = resolution;
  height = resolution;
  saveToCanvasBuffer();
  canvas.width = width;
  canvas.height = height;
  setAnimationSize(width, height);
  setFrameSize(width, height);
  loadFromCanvasBuffer(canvasBuffer);
  pixelSize = canvas.offsetWidth / resolution;
  setFrameInfo(resolution, x, y);
}

function setPenSize(size) {
  penSizeCurrent.className = `pen-size-${size}`;
  penSize = size;
}

export function selectItem(form, item) {
  if (form === 'instrument-set') {
    bucket.className = 'instrument-set__item';
    chooseColor.className = 'instrument-set__item';
    pencil.className = 'instrument-set__item';
    line.className = 'instrument-set__item';
    erase.className = 'instrument-set__item';
    item.className = 'instrument-set__item selected';
    currentInstrument = item.id;
  }
  if (form === 'settings__resolution') {
    res32.className = 'settings__resolution__item';
    res64.className = 'settings__resolution__item';
    res128.className = 'settings__resolution__item';
    item.className = 'settings__resolution__item selected';
  }
}


primaryColorButton.addEventListener('input', () => primaryColor = primaryColorButton.value);
secondaryColorButton.addEventListener('input', () => secondaryColor = secondaryColorButton.value);
swapColors.addEventListener('click', () => {
  const tempColor = primaryColor;
  primaryColor = secondaryColor;
  primaryColorButton.value = primaryColor;
  secondaryColor = tempColor;
  secondaryColorButton.value = secondaryColor;
});

function setCurrentColor(mouseButton, color) {
  if (mouseButton === 0) {
    primaryColor = color;
    primaryColorButton.value = color;
  } else if (mouseButton === 2) {
    secondaryColor = color;
    secondaryColorButton.value = color;
  }
}


// instrument bucket
function bucketCanvas(mouseButton) {
  if (mouseButton === 0) {
    ctx.fillStyle = primaryColor;
  } else if (mouseButton === 2) {
    ctx.fillStyle = secondaryColor;
  }
  ctx.fillRect(0, 0, width * pixelSize, height * pixelSize);
}


// instrument erase
function eraseInstrument() {
  const col = Math.floor(mousePosition(event)[0] / pixelSize);
  const row = Math.floor(mousePosition(event)[1] / pixelSize);

  ctx.clearRect(col, row, penSize, penSize);
}


// instrument line
function lineInstrument() {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = penSize;
  ctx.strokeStyle = primaryColor;
  ctx.stroke();
}


// instrument choose color
function colorDropper(x, y) {
  let rgb;
  const colorArray = ctx.getImageData(x, y, 1, 1).data;

  switch(colorArray.toString()) {
    case '0,0,0,255':
      rgb = '#000000';
      break;
    case '0,0,0,0':
      rgb = '#ffffff';
      break;
    default:
      const r = colorArray[0];
      const g = colorArray[1];
      const b = colorArray[2];
      rgb = `#${((1 << 24) + ((+r) << 16) + ((+g) << 8) + (+b)).toString(16).slice(1)}`;
  }

  return rgb;
}


// instrument pencil
function pencilInstrument(mouseButton) {
  const col = Math.floor(mousePosition(event)[0] / pixelSize);
  const row = Math.floor(mousePosition(event)[1] / pixelSize);

  if (mouseButton === 0) {
    ctx.fillStyle = primaryColor;
  } else if (mouseButton === 2) {
    ctx.fillStyle = secondaryColor;
  }
  ctx.fillRect(col, row, penSize, penSize);
}

// get mouse position
function mousePosition(e) {
  const x = !e.offsetX ? e.layerX : e.offsetX;
  const y = !e.offsetY ? e.layerY : e.offsetY;
  return [x, y];
}

// draw canvas
let x = 0;
let y = 0;
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;
let drawCanvas = false;
canvas.addEventListener('mousedown', (event) => {
  drawCanvas = true;
  x1 = Math.floor(mousePosition(event)[0] / pixelSize);
  y1 = Math.floor(mousePosition(event)[1] / pixelSize);
  if (currentInstrument === 'bucket') {
    bucketCanvas(event.button);
  }
  if (currentInstrument === 'chooseColor') {
    setCurrentColor(event.button, colorDropper(x1, y1));
  }
  if (currentInstrument === 'pencil') {
    pencilInstrument(event.button);
  }
  if (currentInstrument === 'erase') {
    eraseInstrument();
  }
});

canvas.addEventListener('mouseup', () => {
  drawCanvas = false;
  x2 = Math.floor(mousePosition(event)[0] / pixelSize);
  y2 = Math.floor(mousePosition(event)[1] / pixelSize);
  if (currentInstrument === 'line') {
    lineInstrument();
  }
  saveToCanvasBuffer();
  drawFrame(canvasBuffer);
  loadAnimationBuffer(canvasBuffer);
});

canvas.addEventListener('mousemove', () => {
  x = Math.floor(mousePosition(event)[0] / pixelSize);
  y = Math.floor(mousePosition(event)[1] / pixelSize);
  if (drawCanvas) {
    if (currentInstrument === 'pencil') {
      pencilInstrument();
    }
    if (currentInstrument === 'erase') {
      eraseInstrument();
    }
  }
  setFrameInfo(width, x, y);
});


// change instruments using buttons
window.addEventListener('keydown', (event) => {
  switch(event.code) {
    case 'KeyC':
      selectItem('instrument-set', chooseColor);
      break;
    case 'KeyP':
      selectItem('instrument-set', pencil);
      break;
    case 'KeyB':
      selectItem('instrument-set', bucket);
      break;
    case 'KeyE':
      selectItem('instrument-set', erase);
      break;
    case 'KeyL':
      selectItem('instrument-set', line);
      break;
    case 'Digit1':
      setPenSize(1);
      break;
    case 'Digit2':
      setPenSize(2);
      break;
    case 'Digit3':
      setPenSize(3);
      break;
    case 'Digit4':
      setPenSize(4);
      break;
  }
});


// load & save canvas data to buffer
function saveToCanvasBuffer() {
  canvasBuffer = ctx.getImageData(0, 0, width, height);
}

export function loadFromCanvasBuffer(data) {
  ctx.putImageData(data, 0, 0);
}


// Local storage save & load
function localStorageSave() {
  localStorage.setItem('instrument', currentInstrument);
  localStorage.setItem('resolution', `${width}, ${height}`);
  localStorage.setItem('primaryColor', primaryColor);
  localStorage.setItem('secondaryColor', secondaryColor);
  localStorage.setItem('penSize', penSize);
}

function localStorageLoad() {
  if (localStorage.getItem('primaryColor')) {
    setCurrentColor(0, localStorage.getItem('primaryColor'));
  }
  if (localStorage.getItem('secondaryColor')) {
    setCurrentColor(2, localStorage.getItem('secondaryColor'));
  }
  if (localStorage.getItem('penSize')) {
    setPenSize(localStorage.getItem('penSize'));
  }

  switch(localStorage.getItem('instrument')) {
    case 'bucket':
      selectItem('instrument-set', bucket);
      break;
    case 'chooseColor':
      selectItem('instrument-set', chooseColor);
      break;
    case 'line':
      selectItem('instrument-set', line);
      break;
    case 'erase':
      selectItem('instrument-set', erase);
      break;
    default:
      selectItem('instrument-set', pencil);
  }

  switch(localStorage.getItem('resolution')) {
    case '32, 32':
      selectItem('settings__resolution', res32);
      setCanvasResolution(32);
      break;
    case '64, 64':
      selectItem('settings__resolution', res64);;
      setCanvasResolution(64);
      break;
    default:
      selectItem('settings__resolution', res128);
      setCanvasResolution(128);
  }
}

window.addEventListener('beforeunload', () => {
    localStorageSave();
});

window.onload = () => {
  localStorageLoad();
};
