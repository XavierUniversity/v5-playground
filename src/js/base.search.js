

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

function search(query){
  var resultHTML = '';
  $.ajax({
    url: 'https://search.xavier.edu/s/search.json',
    method: 'GET',
    data: { 'collection': 'xavu-meta', 'query': query, 'show': 15 }
  }).done(function(a, b){
    $.each(a.response.resultPacket.results, function(index, item){      
      var description = item.summary;
      var title = item.title.replace(' | Xavier University', '');
      console.log(title);
      if ( typeof item.metaData.stencilsCourseDesc !== 'undefined' ){
        description = item.metaData.stencilsCourseDesc;
      }
      resultHTML += '<a href="https://search.xavier.edu'+ "LINK" +'" class="search__result">';
      resultHTML += '<h2 class="search__title">' + title +'</h2>';
      resultHTML += '<p class="search__content">';
      resultHTML += '<span class="search__url">'+ item.liveUrl +'</span>';
      resultHTML += '<span class="search__description">'+ description +'</span>';
      resultHTML += '<span class="search__tag">' + item.collection + '</span>';  
      resultHTML += '</p></a>';
    });
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
  search($(this).val());
}, 250));

$("#header-search").on("submit", function(e){
  e.preventDefault();
  search($("#query").val());
});