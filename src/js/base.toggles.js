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
$(document).on("click", "[data-toggle]", function(e){
  e.preventDefault();
  var list = $(this).data("toggle");
  $(list).toggleClass("visible");
  $(this).attr('aria-expanded', function (i, attr) {
    return attr == 'true' ? 'false' : 'true'
  });
  $(this).prev().attr('aria-expanded', function (i, attr) {
    return attr == 'true' ? 'false' : 'true'
  });
  $('[data-toggle='+list+']').toggleClass("on");
});