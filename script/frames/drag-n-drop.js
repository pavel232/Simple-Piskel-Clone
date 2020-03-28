// drag n drop functionally from https://habr.com/ru/company/mailru/blog/207048/

export function sortable(rootEl, framesList, refreshFunction){
  let dragEl;
  let nextEl;
  
  framesList = document.querySelectorAll('.frames-element');
  framesList.forEach((frame) => {
    frame.draggable = true;
  });

  function _onDragOver(evt){
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
    
    let target = evt.target.parentNode;
    if( target && target !== dragEl && target.nodeName == 'LI' ){
      var rect = target.getBoundingClientRect();
      var next = (evt.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
      rootEl.insertBefore(dragEl, next && target.nextSibling || target);
    }
  }

  function _onDragEnd(evt){
    evt.preventDefault();
    
    dragEl.classList.remove('ghost');
    rootEl.removeEventListener('dragover', _onDragOver, false);
    rootEl.removeEventListener('dragend', _onDragEnd, false);

    refreshFunction();
  }

  rootEl.addEventListener('dragstart', function (evt){
    dragEl = evt.target;
    nextEl = dragEl.nextSibling;

    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('Text', dragEl.textContent);

    rootEl.addEventListener('dragover', _onDragOver, false);
    rootEl.addEventListener('dragend', _onDragEnd, false);

    dragEl.classList.add('ghost');
  }, false);
}
