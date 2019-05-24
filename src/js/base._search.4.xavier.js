/*
Handlebars.registerHelper('replaceComma', function(value){
  var t = value.replace(/,/g, ', ');
  return t;
});
Handlebars.registerHelper('trimString', function(passedString) {
  var theString;
  if ( passedString !== null && passedString.length > 100){
    theString = passedString.substring(0,100) + "...";
  }
  theString.replace(/,/g, ', ');
  return new Handlebars.SafeString(theString);
});

jQuery('#header-search #query').qc({
  program: 'https://search.xavier.edu/s/suggest.json',
  alpha: '0.5',
  show: '10',
  sort: '0',
  length: '3',
  datasets:{
    organic: {
      name: 'Search Suggestions',
      collection: 'xavu-meta',
      profile: '_default',
      show: '5'
    }
,
    programs: {
      name: 'Programs',
      collection: 'xavu-programs',
      profile: 'auto-completion',
      show: '3',
      template: {
        suggestion: '<div class="tt-suggestion tt-selectable media"><div class="media-body"><h6>{{extra.disp.title}}</h6><p><em>{{extra.disp.metaData.stencilsCourseLevel}}</em><br />{{{trimString extra.disp.metaData.stencilsCourseDesc}}}...</p></div></div>'
      }
    },
    people: {
      name: 'People',
      collection: 'xavu-people',
      profile: 'auto-completion',
      show: '3',
      template: {
        suggestion: '<div class="media">{{#if extra.disp.metaData.I}}<img src="{{extra.disp.metaData.I}}" alt="{{extra.disp.title}}" />{{/if}}<div class="media-body"><h6>{{extra.disp.metaData.stencilsPeopleFirstName}} {{extra.disp.metaData.stencilsPeopleLastName}}</h6><p><em>{{{replaceComma extra.disp.metaData.stencilsPeoplePosition}}}</em>{{#if extra.disp.metaData.stencilsPeoplePhone}}<br />{{extra.disp.metaData.stencilsPeoplePhone}}{{/if}}</p></div></div>'
      }
    }
  }
});
*/

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

$('#query').on("keyup", delay(function(e){
  e.preventDefault();
  var query = $(this).val();
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
}, 250));


