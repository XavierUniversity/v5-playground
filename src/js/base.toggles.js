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
// Toggles the visible state as needed.
function toggleState(elem, stateOne){
  var elem = document.querySelectorAll(elem);
  if ( !elem ) return;
  elem.forEach( function(el){
    el.classList.toggle(stateOne);
  });
};

// Monitors the click events....Grabs the to be toggled item
function toggleStateEvent(event){
  toggleState(event.target.getAttribute('data-toggle'), 'visible');
  
  var e = document.querySelectorAll('[data-toggle="'+ event.target.getAttribute('data-toggle') +'"]');
  e.forEach( function(el){
    el.classList.toggle("on");
  })
}

// Obvi...the event listener.
document.addEventListener('click', toggleStateEvent);