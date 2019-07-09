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
$("[data-toggle]").on('click', function(e){
  e.preventDefault();
  var list = $(this).data("toggle");
  $(list).toggleClass("visible");
  $('[data-toggle='+list+']').toggleClass("on");
});