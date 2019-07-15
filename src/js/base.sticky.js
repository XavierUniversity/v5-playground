/**
  * base.sticky.js
  * =======================
  * 
  * Sets the offset for putting the header bar as a fixed nav item
  * when we scroll the page.
  *
  * -----------------------
  * Improvements:
  * 
**/

var h = document.querySelector("#header");
var stuck = false;
var stickPoint = getDistance();

function getDistance() {
  var topDist = h.offsetTop;
  return topDist;
}

window.onscroll = function(e) {
  if ( document.querySelector("body").classList.contains("homepage") ){
    var distance = getDistance() - window.pageYOffset;
    var offset = window.pageYOffset;
    if ( (distance < 0) && !stuck) {
      h.classList.add('header--fixed');
      stuck = true;
    } else if (stuck && (offset <= stickPoint)){
      h.classList.remove('header--fixed');
      stuck = false;
    }  
  }
  
}