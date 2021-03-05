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
    var email = ( object.metaData.stencilsPeopleEmail != undefined ? '<a href="mailto:'+object.metaData.stencilsPeopleEmail+'@xavier.edu" class="search__contact">' + object.metaData.stencilsPeopleEmail + '@xavier.edu</a>' : '' ); 
    var img = object.metaData.I != undefined ? '<img class="search__image" src="'+object.metaData.I+'" alt="" />' : '';
    var phone = object.metaData.stencilsPeoplePhone != undefined ? '<span class="search__contact">'+ object.metaData.stencilsPeoplePhone + '</span>' : '';
    var loc = object.metaData.stencilsPeopleLocation != undefined ? '<span class="search__contact">' + object.metaData.stencilsPeopleLocation + '</span>' : '';
    title = '<a href="https://search.xavier.edu'+object.clickTrackingUrl+'">' + object.metaData.stencilsPeopleFirstName + '</a>';
    summary = img + '<strong>' + object.metaData.stencilsPeoplePosition + '</strong><br />' + email + phone + loc;
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

function buildBestBets(object){
  var title = object.titleHtml;
  var summary  = object.descriptionHtml;
  var url   = '<span class="search__url">' + object.displayUrl + '</span>';
  var link  = object.linkUrl;
  
  var open = '<a href="https://search.xavier.edu' + link + '" class="search__result search__result--bet">';
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
    url: 'https://search.xavier.edu/s/search.json',
    method: 'GET',
    data: query 
  }).done(function(a, b){
    var tabs = searchArray("Tabs", 'name', a.response.facets);
    var nav = a.response.customData.stencilsPaging;
    var summary = a.response.resultPacket.resultsSummary;
    var results = a.response.resultPacket.results;
    buildTabs(tabs.allValues);
    $.each(a.response.curator.exhibits, function(index, item){
      resultHTML += buildBestBets(item);
    });
    resultHTML += '<p class="search__count">Showing results '+ summary.currStart + '-' + summary.currEnd +' out of '+ summary.totalMatching +' results for: <em>' + a.question.query.replace(/(<([^>]+)>)/ig, '') + '</em></p>';
    
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