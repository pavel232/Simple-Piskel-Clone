// fullscreen api from http://qnimate.com/full-screen-api-tutorial-with-demo/

const animationCanvasWrapper = document.getElementById('animationCanvasWrapper');

export function fullScreen() {
  if ('fullscreenEnabled' in document
  || 'webkitFullscreenEnabled' in document
  || 'mozFullScreenEnabled' in document
  || 'msFullscreenEnabled' in document) {
    if (document.fullscreenEnabled
      || document.webkitFullscreenEnabled
      || document.mozFullScreenEnabled
      || document.msFullscreenEnabled) {
      if ('requestFullscreen' in animationCanvasWrapper) {
        animationCanvasWrapper.requestFullscreen();
      } else if ('webkitRequestFullscreen' in animationCanvasWrapper) {
        animationCanvasWrapper.webkitRequestFullscreen();
      } else if ('mozRequestFullScreen' in animationCanvasWrapper) {
        animationCanvasWrapper.mozRequestFullScreen();
      } else if ('msRequestFullscreen' in animationCanvasWrapper) {
        animationCanvasWrapper.msRequestFullscreen();
      }
    }
  }
}
