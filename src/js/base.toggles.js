/**
  * base.toggles.js
  * =======================
  * 
  * Basic toggle functionality. Uses data-state as a method for
  * CSS targeting for visibility. Very simply, data-state="is-visible" is display:inherit;
  * data-state="is-hidden" is display:none;
  *
  * -----------------------
  * Improvements:
  *  - Hide entities that were open when a new item is clicked
**/

function toggleOverlay(elem, stateOne, stateTwo){
  var overlay = document.getElementById("overlay");
  var elem = document.querySelectorAll(elem);
  if ( !elem ) return;
  elem.forEach( function(el){
    if ( el.id === 'main-nav' ) {
      el.getAttribute('data-state') === stateOne ? overlay.classList.toggle("show") : overlay.classList.remove("show");
      el.getAttribute('data-state') === stateOne ? document.body.classList.add("nav-open") : document.body.classList.remove("nav-open");  
    }
  });
}

function toggleState(elem, stateOne, stateTwo){
  var elem = document.querySelectorAll(elem);
  if ( !elem ) return;
  elem.forEach( function(el){
    el.setAttribute('data-state', el.getAttribute('data-state') === stateOne ? stateTwo : stateOne);
  });
};

function toggleStateEvent(event){
  event.preventDefault();
  toggleState(event.target.getAttribute('data-toggle'), 'is-visible', 'is-hidden');
  toggleOverlay(event.target.getAttribute('data-toggle'), 'is-visible', 'is-hidden');
  event.target.classList.toggle("on");
}

document.addEventListener('click', toggleStateEvent);