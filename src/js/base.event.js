$('.track').on('click', function(e){
  // Collect
  var dis = $(this),
      category = (dis.data('category') ? dis.data('category') : 'link'),
      action = (dis.data('action') ? dis.data('action') : 'click'),
      label = (dis.data('label') ? dis.data('label') : dis.text());
  // Push to GTM
  dataLayer.push({'event' : 'customEvent', 'eventCategory' : category, 'eventAction' : action, 'eventLabel' : label});
});