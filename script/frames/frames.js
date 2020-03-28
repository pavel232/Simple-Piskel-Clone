import { loadFromCanvasBuffer } from '../../script.js';
import { loadAnimationBuffer } from '../animations/animation.js';
import { sortable } from './drag-n-drop.js';


const addNewButton = document.getElementById('addNewFrame');
const framesListElement = document.getElementById('framesList');

let framesList = document.querySelectorAll('.frames-element');
let framesCount = 1;
let currentElement;

let currentFrame = document.getElementById('drawFrame-0');
let ctxFrame = currentFrame.getContext('2d');
let frameBuffer = [];

let width = 128;
let height = 128;


// refresh frames list
function refreshFramesNumbers() {
  framesList = document.querySelectorAll('.frames-element');
  framesCount = 0;
  framesList.forEach((element) => {
    element.id = `frame-${framesCount}`;
    element.children[0].id = `drawFrame-${framesCount}`;
    element.children[1].id = `buttonNumber-${framesCount}`;
    element.children[1].innerHTML = framesCount + 1;
    element.children[2].id = `buttonDelete-${framesCount}`;
    element.children[3].id = `buttonMove-${framesCount}`;
    element.children[4].id = `buttonDuplicate-${framesCount}`;
    framesCount += 1;
  });
}


// select current frame and current canvas drawFrame
function selectFrame(element) {
  framesList = document.querySelectorAll('.frames-element');
  framesList.forEach((frame) => {
    frame.className = 'frames-element';
  });
  element.className = 'frames-element frame-selected';

  currentFrame = element.children[0];
  ctxFrame = currentFrame.getContext('2d');
  frameBuffer.length = 0;
  frameBuffer = ctxFrame.getImageData(0, 0, width, height);
  loadFromCanvasBuffer(frameBuffer);
  loadAnimationBuffer(frameBuffer);
}


function addNewFrame(elAfter, elBefore) {
  const frameElement = `<canvas class="frames-element__draw" width="${width}" height="${height}"></canvas>
<button class="frames-element__button button-number visible"></button>
<button class="frames-element__button button-delete" title="Delete frame"></button>
<button class="frames-element__button button-move" title="Move frame"></button>
<button class="frames-element__button button-duplicate" title="Duplicate this frame"></button>`;

  const frame = document.createElement('li');
  frame.className = 'frames-element';
  frame.innerHTML = frameElement;
  if (elAfter) {
    framesListElement.insertBefore(elAfter, elBefore);
  } framesListElement.insertBefore(frame, elBefore);
  refreshFramesNumbers();
}

function duplicateFrame() {
  const id = parseInt(currentElement.id.slice(16), 10);
  const elAfter = document.getElementById(`frame-${id}`);
  let elBefore = document.getElementById(`frame-${id + 1}`);
  elBefore = elBefore === null ? addNewButton : elBefore;
  let tempCanvas = document.getElementById(`drawFrame-${id}`);
  const tempBuffer = tempCanvas.getContext('2d').getImageData(0, 0, width, height);

  addNewFrame(elAfter, elBefore);
  refreshFramesNumbers();

  tempCanvas = document.getElementById(`drawFrame-${id + 1}`);
  tempCanvas.getContext('2d').putImageData(tempBuffer, 0, 0);

  elBefore = document.getElementById(`frame-${id + 1}`);
  selectFrame(elBefore);
}

function deleteFrame() {
  const id = parseInt(currentElement.id.slice(13), 10);
  const child = document.getElementById(`frame-${id}`);

  if (framesList[id].className === 'frames-element frame-selected') {
    if (id + 1 === framesList.length) {
      selectFrame(framesList[id - 1]);
    } else {
      selectFrame(framesList[id + 1]);
    }
  }

  framesListElement.removeChild(child);
  refreshFramesNumbers();
}


function setVisibility() {
  const className = currentElement.className;
  if (className === 'frames-element__button button-number visible') {
    currentElement.className = 'frames-element__button button-number';
  } else currentElement.className = 'frames-element__button button-number visible';
}


framesListElement.addEventListener('mousedown', (event) => {
  if (event.target.id !== '') {
    currentElement = document.getElementById(`${event.target.id}`);
  }

  if (currentElement.id === 'addNewFrame-a' || currentElement.id === 'addNewFrame') {
    addNewFrame(false, addNewButton);
  } else if (currentElement.id.slice(0, 10) === 'drawFrame-') {
    const frame = document.getElementById(`${event.target.id.slice(4).toLowerCase()}`);
    selectFrame(frame);
  } else if (currentElement.id.slice(0, 13) === 'buttonDelete-') {
    if (framesList.length !== 1) {
      deleteFrame();
    }
  } else if (currentElement.id.slice(0, 16) === 'buttonDuplicate-') {
    duplicateFrame();
  } else if (currentElement.id.slice(0, 11) === 'buttonMove-') {
    sortable(framesListElement, framesList, refreshFramesNumbers);
  } else if (currentElement.id.slice(0, 13) === 'buttonNumber-') {
    setVisibility();
  }
  return 0;
});


export function drawFrame(data) {
  currentFrame.width = width;
  currentFrame.height = height;
  ctxFrame.putImageData(data, 0, 0);
}


export function getFramesDataArray() {
  const dataArray = [];

  framesList = document.querySelectorAll('.frames-element');
  framesList.forEach((frame) => {
    const className = frame.children[1].className;
    if (className === 'frames-element__button button-number visible') {
      const canvas = frame.children[0];
      const imgData = canvas.getContext('2d').getImageData(0, 0, width, height);
      dataArray.push(imgData);
    }
  });

  return dataArray;
}


export function setFrameSize(w, h) {
  framesList = document.querySelectorAll('.frames-element');
  framesList.forEach((frame) => {
    const canvas = frame.children[0];
    const ctx = canvas.getContext('2d');
    const buffer = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = w;
    canvas.height = h;
    ctx.putImageData(buffer, 0, 0);
  });

  width = w;
  height = h;
}
