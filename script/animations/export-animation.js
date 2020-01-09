import { getFramesDataArray } from '../frames/frames.js';
import { fps } from './animation.js';

// export to gif & apng https://github.com/akalverboer/canvas2apng
const animationCanvas = document.getElementById('animationCanvas');
const ctx = animationCanvas.getContext('2d');

const apngButton = document.getElementById('apngButton');
const gifButton = document.getElementById('gifButton');

window.encoder = new APNGencoder(animationCanvas);

function exportToFile() {
    const frames = getFramesDataArray();

    encoder.setRepeat(0);
    encoder.setDelay(100 / fps);
    encoder.setDispose(0);
    encoder.setBlend(0);

    encoder.start();
    frames.forEach((e) => {
        ctx.putImageData(e, 0, 0)
        encoder.addFrame(ctx);
    });
    
    encoder.finish();
}

function downloadFile(iLink, type) {
    exportToFile();
    if (typeof encoder === 'undefined' || encoder.stream() == null || encoder.closeStream==false) {
      alert("Please call start method and add frames and call finish method before calling download"); 
      return 0;
    }
    const out = encoder.stream();
    const href= URL.createObjectURL(new Blob([new Uint8Array(out.bin)], {type : `image/${type}` } ));
    iLink.href = href;
    iLink.download = `animation.${type}`;
    return 0;
}

apngButton.addEventListener('click', () => {
    downloadFile(apngButton, 'png')
});

gifButton.addEventListener('click', () => {
    downloadFile(gifButton, 'gif')
});
