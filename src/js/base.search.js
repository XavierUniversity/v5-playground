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
      html += '<li class="search__facet-item"><a class="search__facet-link" href="'+item.toggleUrl+'">'+ item.label +'</a><span class="search__facet-count">'+item.count+'</span></li>';
    });
    $('#search-tabs').html(html);
  }
}

function buildResult(object){
  console.log(object);
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
      console.log(item);
      
      resultHTML += buildResult(item);
      
/*
      var description = item.summary;
      var title = item.title.replace(' | Xavier University', '');
      var tags = '<span class="search__tag">'+item.collection.replace('xavu-','')+'</span>';
      if ( typeof item.metaData.stencilsCourseDesc !== 'undefined' ){
        description = item.metaData.stencilsCourseDesc;
      }
      if ( typeof item.metaData.stencilsCourseLevel !== 'undefined' ){
        tags += '<span class="search__tag">' + item.metaData.stencilsCourseLevel + '</span>';
      }
      resultHTML += '<a href="https://search.xavier.edu'+ item.clickTrackingUrl +'" class="search__result">';
      resultHTML += '<h2 class="search__title">' + title +'</h2>';
      resultHTML += '<p class="search__content">';
      resultHTML += '<span class="search__url">'+ item.liveUrl +'</span>';
      resultHTML += '<span class="search__description">'+ description +'</span>';
      resultHTML += tags;  
      resultHTML += '</p></a>';
*/
    });
    
    var prev = ( nav.previousUrl !== null ) ? '<a href="'+nav.previousUrl+'" class="o-btn c-btn search__nav">Previous</a>' : '';
    var next = ( nav.nextUrl !== null ) ? '<a href="'+nav.nextUrl+'" class="o-btn c-btn search__nav">Next</a>' : '';
    resultHTML += '<hr />' + prev + next;
    if ( resultHTML.length > 1 ){
      $(".search__results").html('<h1 class="sr-only">Search Results</h1>' + resultHTML);
      $(".search__sidebar").show();
      $(".search__intro").hide();
    } else {
      $(".search__results").html('<h1 class="sr-only">Search Results</h1><p class="search__content">No results found</p>');
      $(".search__sidebar").hide();
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