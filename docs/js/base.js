$("#all-button").click(function() {
     $(".select-box__container").addClass("academic-programs__visible");
     $("h2").show();
      $( ".select-box" ).each(function( index ) { // Loop each of the groups
        if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
          $( this ).prev().hide(); // Hide the previous element
        }
      });
     $(".all-categories").show();
     $(".undergraduate-categories").hide();
     $(".graduate-categories").hide();
});

$("#undergrad-button").click(function() {
    $(".all-categories").hide();
    $(".undergraduate-categories").show();
    $(".graduate-categories").hide();
});

$("#grad-button").click(function() {
  $(".all-categories").hide();
    $(".undergraduate-categories").hide();
    $(".graduate-categories").show();
});

$("#undergrad-button, #grad-button, #all-button").click(function() {
  var val1 = $('[name=degree-radio]:checked').val();
  var degree = $(this).data('degree');
  $(".select-box__container[data-degree!='"+degree+"']").removeClass("academic-programs__visible");
  $(".select-box__container[data-degree='"+degree+"']").addClass("academic-programs__visible");
  $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});

$(".cats-btn-a").click(function() {
  var category = $(this).data('category');
  $(".select-box__container[data-category!='"+category+"']").removeClass("academic-programs__visible");
  $(".select-box__container[data-category*='"+category+"']").addClass("academic-programs__visible");
  $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});

$(".cats-btn-u").click(function() {
  var category = $(this).data('category');
  $(".select-box__container[data-category!='"+category+"'][data-degree='undergraduate']").removeClass("academic-programs__visible");
  $(".select-box__container[data-category*='"+category+"'][data-degree='undergraduate']").addClass("academic-programs__visible");
  $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});

$(".cats-btn-g").click(function() {
  var category = $(this).data('category');
  $(".select-box__container[data-category!='"+category+"'][data-degree='graduate']").removeClass("academic-programs__visible");
  $(".select-box__container[data-category*='"+category+"'][data-degree='graduate']").addClass("academic-programs__visible");
  $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});

$("#all-a-button").click(function() {
     $(".select-box__container").addClass("academic-programs__visible");
     $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});
$("#all-u-button").click(function() {
     $(".select-box__container[data-degree='undergraduate']").addClass("academic-programs__visible");
     $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});
$("#all-g-button").click(function() {
     $(".select-box__container[data-degree='graduate']").addClass("academic-programs__visible");
     $("h2").show();
  $( ".select-box" ).each(function( index ) { // Loop each of the groups
    if($( this ).children('.academic-programs__visible').length === 0 ) { // Check the visible list length; if literally equals 0
      $( this ).prev().hide(); // Hide the previous element
    }
  });
});
var insta = $("[data-image]").data("image");
$.get("https://api.instagram.com/oembed?url=" + insta + "&hidecaption=true&omitscript=true", function(d){
  var parent = $("[data-image='"+ insta +"']");
  parent.css({"background-image": 'url("' + insta + 'media?size=l")', "background-size": 'cover'});
  parent.find(".news--feature__content").attr('href', insta);
  parent.find(".news--feature__name").html('<span class="news--feature__link">'+ '<img src="images/news/instagram.png" style="padding-right:.3rem;">' + d.author_name + '</span>');
  parent.find(".news--feature__caption").html(d.title);
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
  $('.drawer').bind('mouseenter touchstart', function(e) {
    var current = $(window).scrollTop();
      $(window).scroll(function(event) {
          $(window).scrollTop(current);
      });
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
  $('.drawer').bind('mouseleave touchend', function(e) {
      $(window).off('scroll');
  });
  // set focus back to element that had focus before modal.
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
  var open = '<a href="https://search.xavier.edu'+object.clickTrackingUrl+'" class="search__result">';
  var close = '</a>';
  var url = '<span class="search__url">'+object.liveUrl+'</span>';
  var summary = object.summary;
  var html = '$open';
      html += '<h2 class="search__title">$title</h2>';
      html += '<p class="search__content">';
      html += '$liveUrl';
      html += '<span class="search__description">$description</span>';
      html += '<span class="search__tag">'+object.collection.replace('xavu-','')+'</span>';
      if ( typeof object.metaData.stencilsCourseLevel !== 'undefined' ){
        html += '<span class="search__tag">' + object.metaData.stencilsCourseLevel + '</span>';
      }
      html += '</p>$close';
  var tags = '';
  if ( object.collection == "xavu-people" ){
    open = '<div class="search__result">';
    close = '</div>';
    url = '';
    title = '<a href="https://search.xavier.edu'+object.clickTrackingUrl+'">' + object.metaData.stencilsPeopleFirstName + '</a>';
    summary = '<img class="search__image" src="'+object.metaData.I+'" alt="" /><strong>' + object.metaData.stencilsPeoplePosition + '</strong><br /><a href="mailto:'+object.metaData.stencilsPeopleEmail+'@xavier.edu" class="search__contact">' + object.metaData.stencilsPeopleEmail + '@xavier.edu</a> <span class="search__contact">'+ object.metaData.stencilsPeoplePhone + '</span><span class="search__contact">' + object.metaData.stencilsPeopleLocation + '</span>';
  }
  if ( object.collection == "xavu-programs" ){
    summary = object.metaData.stencilsCourseDesc;
  }
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
    url: 'https://search.xavier.edu/s/search.json',
    method: 'GET',
    data: query 
  }).done(function(a, b){
    var tabs = searchArray("Tabs", 'name', a.response.facets);
    var nav = a.response.customData.stencilsPaging;
    var summary = a.response.resultPacket.resultsSummary;
    var results = a.response.resultPacket.results;
    buildTabs(tabs.allValues);
    resultHTML += '<p class="search__count">Showing results '+ summary.currStart + '-' + summary.currEnd +' out of '+ summary.totalMatching +' results for: <em>' + a.question.query + '</em></p>';
    
    $.each(results, function(index, item){
      resultHTML += buildResult(item);
    });
    
    var prev = ( nav.previousUrl !== null ) ? '<a href="'+nav.previousUrl+'" class="search__nav" title="Previous page of search results">Previous</a>' : '';
    var next = ( nav.nextUrl !== null ) ? '<a href="'+nav.nextUrl+'" class="search__nav" title="Next page of search results">Next</a>' : '';
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
  search($(this).attr('href').replace('?',''));
  
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
        scrollTop: target.offset().top
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
    this.changeTab(document.location.hash);
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
$("[data-toggle]").on('click', function(e){
  e.preventDefault();
  var list = $(this).data("toggle");
  $(list).toggleClass("visible");
  $('[data-toggle='+list+']').toggleClass("on");
});
