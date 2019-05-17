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

function toggleMenu(){
  // toggle the visibility of the nav and overlay
  $("#main-nav").toggleClass("visible");
  $("body").toggleClass("nav-open");
  // Set the aria attributes for showing/hiding appropriate content
  $('#main-nav').attr('aria-hidden', $('#main-nav').attr('aria-hidden') == 'false' ? 'true' : 'false');
  $("#content").attr('aria-hidden', $('#main-nav').attr('aria-hidden') == 'false' ? 'true' : 'false');
  
  // attach an event listener to redirect the tab to the modal window.
  $('body').on('focusin', '#content', function(){
    setFocusToFirstItemInModal($("#main-nav"));
  });
  
  focusedElementBeforeModal = jQuery(':focus');
  if ( state == 'closed' ){
    setFocusToFirstItemInModal($("#main-nav")); 
    state = 'opened';
  } else{
    focusedElementBeforeModal.focus();
    state = 'closed';
  }
}

function trapEscapeKey(obj, evt) {
  // if escape pressed
  if (evt.which == 27) {
    // get list of all children elements in given object
    var o = obj.find('*');
    // get list of focusable items
    
    var cancelElement;
    cancelElement = o.filter(".menu_toggle");

    // close the modal window
    cancelElement.click();
    evt.preventDefault();
  }
}

$(".menu_toggle, #overlay").on("click", toggleMenu);

$('#main-nav').keydown(function(event) {
  trapEscapeKey($(this), event);
});