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
    }/*
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
*/
  }
});