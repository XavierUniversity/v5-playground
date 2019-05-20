// jQuery formatted selector to search for focusable items
var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

// store the item that has focus before opening the modal window
var focusedElementBeforeModal;
var state = 'closed';
function setFocusToFirstItemInModal(obj){
  // get list of all children elements in given object
  var o = obj.find('*');

  // set the focus to the first keyboard focusable item
  o.filter(focusableElementsString).filter(':visible').first().focus();
}

function toggleDrawer(target){
  // toggle the visibility of the nav and overlay
  $(target.data.t).toggleClass("visible");
  if ( target.data.t == "#main-nav" ){
    $("body").toggleClass("nav-open");  
  }
  // Set the aria attributes for showing/hiding appropriate content
  $(target.data.t).attr('aria-hidden', $(target.data.t).attr('aria-hidden') == 'false' ? 'true' : 'false');
  $("#content").attr('aria-hidden', $(target.data.t).attr('aria-hidden') == 'false' ? 'true' : 'false');
  
  // attach an event listener to redirect the tab to the modal window.
  $('body').on('focusin', '#content', function(){
    setFocusToFirstItemInModal($(target.data.t));
  });
  
  focusedElementBeforeModal = jQuery(':focus');
  if ( state == 'closed' ){
    setFocusToFirstItemInModal($("target")); 
    state = 'opened';
  } else{
    focusedElementBeforeModal.focus();
    state = 'closed';
  }
  return false;
}

function trapEscapeKey(obj, evt) {
  // if escape pressed
  if (evt.which == 27) {
    // get list of all children elements in given object
    var o = obj.find('*');
    // get list of focusable items
    
    var cancelElement;
    cancelElement = o.filter(['.menu_toggle', '.search_toggle']);

    // close the modal window
    cancelElement.click();
    evt.preventDefault();
  }
  return false;
}

// Click events...
$(".menu_toggle, #overlay").on("click", { t: "#main-nav" }, toggleDrawer);
$(".search_toggle").on("click", { t: "#search" }, toggleDrawer);
// Trap the escape key...
$('#main-nav, #search').keydown(function(event) {
  trapEscapeKey($(this), event);
});