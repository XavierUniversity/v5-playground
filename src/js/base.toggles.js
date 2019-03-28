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

function toggleState(elem, stateOne, stateTwo){
  var elem = document.querySelectorAll(elem);
  if ( !elem ) return;
  elem.forEach( function(el){
    el.setAttribute('data-state', el.getAttribute('data-state') === stateOne ? stateTwo : stateOne);
  });
};

function toggleStateEvent(event){
  toggleState(event.target.getAttribute('data-toggle'), 'is-visible', 'is-hidden');
  event.preventDefault();
}

document.addEventListener('click', toggleStateEvent);