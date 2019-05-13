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

// Turns on/off the overlay when we need it for the navigation drawer
function toggleOverlay(elem, stateOne){
  var overlay = document.getElementById("overlay");
  var elem = document.querySelectorAll(elem);
  if ( !elem ) return;
  elem.forEach( function(el){
    if ( el.id === 'main-nav' ) {
      el.classList.contains(stateOne) ? document.body.classList.add("nav-open") : document.body.classList.remove("nav-open");  
    }
  });
}

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
  event.preventDefault();
  toggleState(event.target.getAttribute('data-toggle'), 'visible');
  toggleOverlay(event.target.getAttribute('data-toggle'), 'visible');
  event.target.classList.toggle("on");
}

// Obvi...the event listener.
document.addEventListener('click', toggleStateEvent);

$("#overlay").on('click', function(){
  toggleState("#main-nav", 'visible');
  toggleOverlay("#main-nav", 'visible');
});