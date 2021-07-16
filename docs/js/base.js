var alert   = document.querySelector('.alert--campus-alert');
var header  = document.querySelector('.header');
var button  = document.getElementById('close-alert') !== null;
var expires = alert !== null ? alert.dataset.date : false;

if ( alert !== null && header.classList.contains('header--fixed') ){
  var styles = 'position: absolute; top: 58px; width: 100%; z-index: 10;';
  alert.style.cssText = styles;
}

if (window.localStorage.getItem('no_alert_'+expires)) {
	alert.style.display = 'none';
}

if ( button ){
  document.getElementById('close-alert').addEventListener('click', function ( event ){
    event.preventDefault();
    window.localStorage.setItem('no_alert_'+expires, true);
    alert.style.display = 'none';
  })
}
var items = [];
if ( $("#announcements").length ){
  var audience = ( $("#announcements").data("audience").toLowerCase() ? $("#announcements").data("audience").toLowerCase() : 'all' );
  var announcements = $.getJSON("/announcements/json/announcements.json", {_: new Date().getTime()}, function(d){
    $.each(d, function(i, item){
      var announcement = '';
      // Get difference from TODAY with Created Date
      var created = new Date(item.created);
      var today = new Date();
      var millisBetween = today.getTime() - created.getTime();    
      var days = Math.floor(millisBetween / (1000 * 60 * 60 * 24));
      var hours = Math.floor(millisBetween / (60 * 60 * 1000));
      
      if ( item.audience.toLowerCase().indexOf(audience) >= 0 || audience == "all"){
        var ellapsed = ( hours <= 24 ? hours + " hour(s)" : days + " day(s)") + " ago";
        announcement = 
        '<button class="o-btn tabs__title accordion__btn" data-toggle="#'+item.id+'" role="tab">'
        +item.title+' - ' + ellapsed + '<svg class="icon accordion__icon accordion__icon--plus"><use xlink:href="#xu-plus"></use></svg><svg class="icon accordion__icon accordion__icon--minus"><use xlink:href="#xu-minus"></use></svg></button>';
        announcement += "<div class='accordion__content' id='"+item.id+"' role='tabpanel'>";
        announcement += "<p>Posted: "+item.created+"</p>";
        announcement += item.content;
        announcement += (item.link !== "" ? '<p><a href="' + item.link + '" title="Additional information for ' + item.title + '">Additional information</a></p>' : '' );
        announcement += "<p class='text--right'><a href='/announcements/flag?="+item.id +"' title='"+item.title+"'>Report announcement</a></p>";
        announcement += "</div>";
      }
      items.push(announcement);
    });
    if ( items.length >= 1 ){
      $("#announcements").append(items); 
    } else {
      $("#announcements").append('<div class="alert alert--info"><div class="alert--info__icon"><span class="fa" aria-hidden="true"></span></div><div class="alert__content"><p>There are no announcements at this time.</p></div></div>'); 
    }
  });
}
function detectmob() { 

    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
      // If mobile, then we do all this
      return true;
    }
    else {
      // If not mobile then do this
      return false;
    }
} // detectmob
if ( $('meta[property="id"]').attr('content') !== undefined ){
  $("#editorAccess").attr('href', "https://cascade.xavier.edu/entity/open.act?id="+ $('meta[property="id"]').attr('content') +"&type=page&action=edit");
}
$('.track').on('click', function(e){
  // Collect
  var dis = $(this),
      category = (dis.data('category') ? dis.data('category') : 'link'),
      action = (dis.data('action') ? dis.data('action') : 'click'),
      label = (dis.data('label') ? dis.data('label') : dis.text());
  // Push to GTM
  dataLayer.push({'event' : 'customEvent', 'eventCategory' : category, 'eventAction' : action, 'eventLabel' : label});
});
// AJAX form submissions
$(".form--ajax").on('submit', function(e){
  e.preventDefault();
  $form = $(this);
  url = '/includes/data';
  $.ajax({
    type: "POST",
    url: url,
    data: $form.serialize()
  }).always(function(d, t, j){
  }).done(function(d, t, j){
    $("#message").removeClass();
    $("#message").addClass('alert alert--' + d.status);
    $("#message").html('<div class="alert--'+d.status+'__icon"><span class="fa" aria-hidden="true"></span></div><div class="alert__content"><p>' + d.message + '</p></div>');
    try{
      if ( d.status == "success" && typeof reloadLocation !== "undefined" ){
        window.location.href = reloadLocation;
        return false;
      }
    }catch(err){}
    if ( d.status == "success" && ($form.attr('id') == "login-form" || $form.attr('id') == "parent-link-form") ) {
      window.location.reload();
    }
    setTimeout(removeMessage,10000);
  }).fail(function(j, t){
    $("#message").removeClass();
    $("#message").addClass('alert alert--danger');
    $("#message").html('<div class="alert--danger__icon"><span class="fa" aria-hidden="true"></span></div> <div class="alert__content"><p>There was an error processing your request. Please try again later.</p></div>');
    setTimeout(removeMessage,5000);
  });
});

$(".form--ajax--lookup").on('submit', function(e){
  e.preventDefault();
  $form = $(this);
  url = '/includes/data';
  $.ajax({
    type: "POST",
    url: url,
    data: $form.serialize()
  }).always(function(d, t, j){
  }).done(function(d, t, j){
    $("#results").html(d.content);
  });
});

function removeMessage(){
  $("#message").html('');
  $("#message").removeClass();
}
var instas = $("[data-image]");
if ( instas.length > 0 ){
  for ( var i = 0; i < instas.length; i++){
    var insta = $(instas[i]).data('image');
    $.ajax({
      dataType: "json",
      url: "https://www.xavier.edu/_V5/api/insta",
      data: { instagram_post : insta }
    }).done(function(d){
      var parent = $("[data-image='"+ insta +"']");
      parent.css({"background-image": 'url("' + d.thumbnail_url + '")', "background-size": 'cover'});
      parent.find(".news--feature__content").attr('href', insta);
      parent.find(".news--feature__name").html('<span class="news--feature__link">'+ '<svg height="45" width="46"><use xlink:href="#xu-instagram"></use></svg>' + d.author_name + '</span>');
      parent.find(".news--feature__caption").hide();
    });
  }
}
$('.ajax-logout').on('click', function(e){
  e.preventDefault();
  url = $(this).data('url');
  $.ajax({
    type: "POST",
    url: url,
    data: { 'action': $(this).data('action'), 'token': $(this).data('token') },
  }).always(function(d, t, j){
    window.location.href = "/" + d.destination + "/";
  });
});
// jQuery formatted selector to search for focusable items
var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

// store the item that has focus before opening the modal window
var focusedElementBeforeModal;
var id;
jQuery('.drawer-open').click(function(e){
  e.preventDefault();
  id = $(this).data("controls");
  openDrawer($('#'+id));
});

jQuery('.drawer-close').click(function(e){
  closeDrawer();
});

jQuery('.drawer').keydown(function(e){
  trapEscapeKey($(this), e);
});

jQuery('.drawer').keydown(function(e){
  trapTabKey($(this), e);
});
  
jQuery("#overlay").click(function(e){
  closeDrawer();
});


function trapEscapeKey(obj, e){
  if ( e.which == 27){
    var o = obj.find('*');
    var cancelElement = o.filter(".drawer-close");
    cancelElement.click();
    e.preventDefault();
  }
}

function trapTabKey(obj, e){
  // if tab or shift-tab pressed
  if (e.which == 9) {
    // get list of all children elements in given object
    var o = obj.find('*');
    
    // get list of focusable items
    var focusableItems;
    focusableItems = o.filter(focusableElementsString).filter(':visible');
    
    // get currently focused item
    var focusedItem;
    focusedItem = jQuery(':focus');
    
    // get the number of focusable items
    var numberOfFocusableItems;
    numberOfFocusableItems = focusableItems.length;
    
    // get the index of the currently focused item
    var focusedItemIndex;
    focusedItemIndex = focusableItems.index(focusedItem);
  
    if (e.shiftKey) {
      //back tab
      // if focused on first item and user preses back-tab, go to the last focusable item
      if (focusedItemIndex === 0) {
        focusableItems.get(numberOfFocusableItems - 1).focus();
        e.preventDefault();
      }

    } else {
      //forward tab
      // if focused on the last item and user preses tab, go to the first focusable item
      if (focusedItemIndex == numberOfFocusableItems - 1) {
        focusableItems.get(0).focus();
        e.preventDefault();
      }
    }
  }
}

function setFocusToFirstItem(obj) {
  // get list of all children elements in given object
  var o = obj.find('*');

  // set focus to first focusable item
  setTimeout(function(){o.filter(focusableElementsString).filter(':visible').first().focus()}, 250);
}

function openDrawer(obj){
  if ( obj.attr("id") == "main-nav"){ // Change the body class for main nav
    jQuery("body").addClass('nav-open'); // will show the overlay
  }
  jQuery(obj).addClass('visible'); // Make the drawer visible
  jQuery(obj).attr('aria-hidden', false); // mark it as no longer hidden
  jQuery("#content").attr('aria-hidden', true); // mark content as hidden
  
  // listener to redirect tab to drawer if they somehow get out...
  jQuery('body').on('focusin', '#content', function(){
    setFocusToFirstItem(jQuery(obj));
  });
  // save current focus
  focusedElementBeforeModal = jQuery(':focus');
  setFocusToFirstItem(obj);
}

function closeDrawer(){
  jQuery("body").removeClass('nav-open'); // remove the overlay
  jQuery('.drawer').removeClass('visible'); // remove drawer from visible flow
  jQuery('.drawer').attr('aria-hidden', true); // hide drawer
  jQuery("#content").attr('aria-hidden', false); // make content visible again
  // Remove listener
  jQuery('body').off('focusin', "#content");
  // set focus back to element that had focus before modal.
  focusedElementBeforeModal.focus();
}
/*
============================================
License for Application
============================================

This license is governed by United States copyright law, and with respect to matters
of tort, contract, and other causes of action it is governed by North Carolina law,
without regard to North Carolina choice of law provisions.  The forum for any dispute
resolution shall be in Wake County, North Carolina.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list
of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this
list of conditions and the following disclaimer in the documentation and/or other
materials provided with the distribution.

3. The name of the author may not be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

// jQuery formatted selector to search for focusable items
var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

// store the item that has focus before opening the modal window
var focusedElementBeforeModal;

jQuery('[data-modal]').click(function(e) {
  e.preventDefault();
  id = $(this).data("modal");
  showModal($('#'+id));
});

jQuery('#cancel').click(function(e) {
  hideModal();
});

jQuery('#cancelButton').click(function(e) {
  hideModal();
});
jQuery('#enter').click(function(e) {
  enterButtonModal();
});
jQuery('.modalCloseButton').click(function(e) {
  hideModal();
});
jQuery('.modal').keydown(function(event) {
  trapTabKey($(this), event);
});
jQuery('.modal').keydown(function(event) {
  trapEscapeKey($(this), event);
});

function trapEscapeKey(obj, evt) {
  // if escape pressed
  if (evt.which == 27) {
    // get list of all children elements in given object
    var o = obj.find('*');
    // get list of focusable items
    
    var cancelElement;
    cancelElement = o.filter("#cancel");

    // close the modal window
    cancelElement.click();
    evt.preventDefault();
  }
}

function trapTabKey(obj, evt) {
  // if tab or shift-tab pressed
  if (evt.which == 9) {
    // get list of all children elements in given object
    var o = obj.find('*');
    
    // get list of focusable items
    var focusableItems;
    focusableItems = o.filter(focusableElementsString).filter(':visible');
    
    // get currently focused item
    var focusedItem;
    focusedItem = jQuery(':focus');
    
    // get the number of focusable items
    var numberOfFocusableItems;
    numberOfFocusableItems = focusableItems.length;
    
    // get the index of the currently focused item
    var focusedItemIndex;
    focusedItemIndex = focusableItems.index(focusedItem);
  
    if (evt.shiftKey) {
      //back tab
      // if focused on first item and user preses back-tab, go to the last focusable item
      if (focusedItemIndex === 0) {
        focusableItems.get(numberOfFocusableItems - 1).focus();
        evt.preventDefault();
      }

    } else {
      //forward tab
      // if focused on the last item and user preses tab, go to the first focusable item
      if (focusedItemIndex == numberOfFocusableItems - 1) {
        focusableItems.get(0).focus();
        evt.preventDefault();
      }
    }
  }
}

function setInitialFocusModal(obj) {
  // get list of all children elements in given object
  var o = obj.find('*');
  // set focus to first focusable item
  var focusableItems;
  focusableItems = o.filter(focusableElementsString).filter(':visible').first().focus();
}

function enterButtonModal() {
  // BEGIN logic for executing the Enter button action for the modal window
  alert('form submitted');
  // END logic for executing the Enter button action for the modal window
  hideModal();
}

function setFocusToFirstItemInModal(obj){
  // get list of all children elements in given object
  var o = obj.find('*');

  // set the focus to the first keyboard focusable item
  o.filter(focusableElementsString).filter(':visible').first().focus();
}

function showModal(obj) {
  var overlay = "<div id=\"modalOverlay\"></div>";
  if ( !jQuery('#modalOverlay').length ){
    jQuery('body').append(overlay);  
  }
  jQuery('body').css('overflow', 'hidden');
  jQuery('#content-wrap').attr('aria-hidden', 'true'); // mark the main page as hidden
  jQuery('#modalOverlay').css('display', 'block'); // insert an overlay to prevent clicking and make a visual change to indicate the main apge is not available
  jQuery(obj).addClass('visible'); // make the modal window visible
  jQuery(obj).attr('aria-hidden', 'false'); // mark the modal window as visible

  // attach a listener to redirect the tab to the modal window if the user somehow gets out of the modal window
  jQuery('body').on('focusin','#mainPage',function() {
    setFocusToFirstItemInModal(jQuery(obj));
  });

  // save current focus
  focusedElementBeforeModal = jQuery(':focus');

  setFocusToFirstItemInModal(obj);
}

function hideModal() {
  jQuery('#modalOverlay').css('display', 'none'); // remove the overlay in order to make the main screen available again
  jQuery('.modal').removeClass('visible'); // hide the modal window
  jQuery('.modal').attr('aria-hidden', 'true'); // mark the modal window as hidden
  jQuery('#content-wrap').attr('aria-hidden', 'false'); // mark the main page as visible

  // remove the listener which redirects tab keys in the main content area to the modal
  jQuery('body').css('overflow', 'visible');
  jQuery('body').off('focusin','#mainPage');

  // set focus back to element that had it before the modal was opened
  focusedElementBeforeModal.focus();
}
function delay(callback, ms){
  var timer = 0;
  return function(){
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function(){
      callback.apply(context, args);
    }, ms || 0);
  };
}

function searchArray(nameKey, prop, myArray){
  for ( var i=0; i<myArray.length; i++){
    if ( myArray[i][prop]===nameKey ){
      return myArray[i];
    }
  }
}

function buildTabs(tabArray, id){
  var html = '';
  var id = (typeof id !== 'undefined' ? "#facets" : id);
  if ( tabArray.length > 1 ){
    $.each(tabArray, function(index, item){
      html += '<li class="search__facet-item"><a class="search__facet-link' + (item.selected == true ? ' is-active' : '') +'" href="'+item.toggleUrl+'">'+ item.label +'</a><span class="search__facet-count">'+item.count+'</span></li>';
    });
    $('#search-tabs').html(html);
  }
}

function buildResult(object){
  var title = object.title.replace(" | Xavier University", '');
  var open = '<a href="'+object.link+'" class="search__result">';
  var close = '</a>';
  var url = '<span class="search__url">'+object.htmlFormattedUrl+'</span>';
  var summary = object.htmlSnippet;
  var html = '$open';
      html += '<h2 class="search__title">$title</h2>';
      html += '<p class="search__content">';
      html += '$liveUrl';
      html += '<span class="search__description">$description</span>';
      html += '</p>$close';
  var tags = '';
/*
  if ( object.collection == "xavu-people" ){
    open = '<div class="search__result">';
    close = '</div>';
    url = '';
    var email = ( object.metaData.stencilsPeopleEmail != undefined ? '<a href="mailto:'+object.metaData.stencilsPeopleEmail+'@xavier.edu" class="search__contact">' + object.metaData.stencilsPeopleEmail + '@xavier.edu</a>' : '' ); 
    var img = object.metaData.I != undefined ? '<img class="search__image" src="'+object.metaData.I+'" alt="" />' : '';
    var phone = object.metaData.stencilsPeoplePhone != undefined ? '<span class="search__contact">'+ object.metaData.stencilsPeoplePhone + '</span>' : '';
    var loc = object.metaData.stencilsPeopleLocation != undefined ? '<span class="search__contact">' + object.metaData.stencilsPeopleLocation + '</span>' : '';
    title = '<a href="https://search.xavier.edu'+object.clickTrackingUrl+'">' + object.metaData.stencilsPeopleFirstName + '</a>';
    summary = img + '<strong>' + object.metaData.stencilsPeoplePosition + '</strong><br />' + email + phone + loc;
  }
*/
/*
  if ( object.collection == "xavu-programs" ){
    summary = object.metaData.stencilsCourseDesc;
  }
*/
  html = html.replace("$open", open);
  html = html.replace("$title", title);
  html = html.replace("$liveUrl", url);
  html = html.replace("$description", summary);
  html = html.replace("$close", close);
  return html;
}

function buildBestBets(object){
  var title = object.title;
  var summary  = object.bodyLines[0].title;
  var url   = '<span class="search__url">' + object.link + '</span>';
  var link  = object.link;
  
  var open = '<a href="' + link + '" class="search__result search__result--bet">';
  var close = '</a>';
  var html = '$open';
      html += '<h2 class="search__title">$title</h2>';
      html += '<p class="search__content">';
      html += "$liveUrl";
      html += '<span class="search__description">$description</span>';
      html += '</p>$close';
      html = html.replace("$open", open);
      html = html.replace("$title", title);
      html = html.replace("$liveUrl", url);
      html = html.replace("$description", summary);
      html = html.replace("$close", close);
  
  return html;
}

function search(query){
  var resultHTML = '';
  $.ajax({
    url: 'https://www.googleapis.com/customsearch/v1/siterestrict',
    method: 'GET',
    data: query
  }).done(function(a, b){
//     var tabs = searchArray("Tabs", 'name', a.response.facets);
    var queries = a.queries; // Query information, including Next, Previous and request details
    var request = queries.request[0]; // Contains the current count, startIndex and total results
    var summary = a.searchInformation; // Contains human readable information
    var results = a.items;
    
//     buildTabs(tabs.allValues);
    if ( a.promotions !== undefined ) {
      $.each(a.promotions, function(index, item){
        resultHTML += buildBestBets(item);
      });
    }
    resultHTML += '<p class="search__count">Showing results '+ request.startIndex + '-' + (request.startIndex + request.count) +' out of '+ summary.formattedTotalResults +' results for: <em>' + request.searchTerms + '</em></p>';

    $.each(results, function(index, item){
      resultHTML += buildResult(item);
    });

    var prev = ( queries.previousPage !== undefined ) ? '<a href="#" data-start="'+queries.previousPage[0].startIndex+'" class="search__nav" title="Previous page of search results">Previous</a>' : '';
    var next = ( queries.nextPage !== undefined ) ? '<a href="#" data-start="'+queries.nextPage[0].startIndex+'" class="search__nav" title="Next page of search results">Next</a>' : '';
    resultHTML += '<div class="search__nav-container">' + prev + next + '</div>';
    if ( resultHTML.length > 1 ){
      $(".search__results").html('<h1 class="sr-only">Search Results</h1>' + resultHTML);
      $(".search__sidebar").addClass('visible');
      $(".search__intro").hide();
    } else {
      $(".search__intro").show();
      $(".search__results").html('<h1 class="sr-only">Search Results</h1><p class="search__content">No results found</p>');
      $(".search__sidebar").removeClass('visible');
    }
  });
}

$('#query').on("keyup", delay(function(e){
  e.preventDefault();
  search($("#header-search").serialize());
}, 250));


$("#header-search").on("submit", function(e){
  e.preventDefault();
  search($(this).serialize());
});

$(document).on('click', '.search__nav', function(e){
  e.preventDefault();
  $('#start').val($(this).data('start'));
  $("#header-search").submit();
  
});

$(document).on('click', '.search__facet-link', function(e){
  e.preventDefault();
  search($(this).attr('href').replace("?",""));
});

$('[data-controls="#search"]').on('click', function(e){
  $("#query").val('');
  $('.search__results').html('');
  $('.search__sidebar').removeClass('visible');
  $('.search__intro').show();
});
// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.not('[class*="tab__link"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 60
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});
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
  if ( document.querySelector(".header").classList.contains("homepage") ){
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
function wrap(top, selector, bottom){
  var matches = document.querySelectorAll(selector);
  for (var i = 0; i < matches.length; i++){
    var modified = top + matches[i].outerHTML + bottom;
    matches[i].outerHTML = modified;
  }
}
wrap("<div style='display: grid;'><div class='resp-table'>", "table:not(.no-resp)", "</div></div>");

var Tabs = {
   init: function() {
     this.bindUIfunctions();
     this.pageLoadCorrectTab();
   },
   bindUIfunctions: function() {
     // Delegation
     $(document)
       .on("click", ".tabs a[href^='#']:not('.visible')", function(event) {
         Tabs.changeTab(this.hash);
         event.preventDefault();
       })
       .on("click", ".tabs a.visible", function(event) {
         event.preventDefault();
       });
   },
   changeTab: function(hash) {
     var anchor = $('[href="' + hash + '"]');
     var div = $(hash);
     var btn = $('[data-toggle="' + hash + '"]');
     // activate correct anchor (visually)
     anchor.addClass("visible").parent().siblings().find("a").removeClass("visible");
     anchor.addClass('on').parent().siblings().find('a').removeClass('on');
     btn.addClass('on').parent().siblings().find('button').removeClass('on');
     // activate correct div (visually)
     div.addClass("visible").siblings().removeClass("visible");
     // update URL, no history addition
     window.history.replaceState("", "", hash);
   },
   // If the page has a hash on load, go to that tab
   pageLoadCorrectTab: function() {
     if ( document.location.hash != ""){
       this.changeTab(document.location.hash);
     }
   }
 }
 Tabs.init(); 
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
  $('[data-toggle="'+list+'"]').toggleClass("on");
});
// Need to see if we are on a mobile device. If we aren't, let's post the video!
var vid = document.querySelector(".hero video");
if ( !detectmob() && vid !== null ) { 
  var button = document.createElement("button");
  button.innerHTML = '<span class="sr-only">Pause Video</span><svg height="32" width="32" fill="white"><use xlink:href="#xu-pause"/></svg>';
  button.style.cssText = "position: absolute; bottom: 3rem; right: 5rem; z-index: 1; padding: 1rem;";
  button.className = "o-btn";
  button.addEventListener('click', function(e){
    if ( vid.paused ) {
      vid.play();
      button.innerHTML = '<span class="sr-only">Play Video</span><svg height="32" width="32" fill="white"><use xlink:href="#xu-pause"/></svg>';
      dataLayer.push({'event' : 'customEvent', 'eventCategory' : 'BG Video', 'eventAction' : 'click', 'eventLabel' : 'play'});
    } else {
      vid.pause();
      button.innerHTML = '<span class="sr-only">Pause Video</span><svg height="32" width="32" fill="white"><use xlink:href="#xu-play"/></svg>';
      dataLayer.push({'event' : 'customEvent', 'eventCategory' : 'BG Video', 'eventAction' : 'click', 'eventLabel' : 'pause'});
    }
  });
  vid.innerHTML = '<source src="'+vid.getAttribute('data-bgvideo')+'" type="video/mp4" />';
  console.log(vid.parentNode);
  vid.parentNode.appendChild(button);
}

// Video Button -- for things like Campus Life / Diversity
$("#vid-btn").click(function(){
    $("#video-overlay iframe").attr('src', $(this).data('video'));
    $("#video-overlay").show();
});
// Video Overlay
$("#close-video-overlay").click(function(){
    $("#video-overlay").hide();
    $("#video-overlay iframe").attr('src','');  
});