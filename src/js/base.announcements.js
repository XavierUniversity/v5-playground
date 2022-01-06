var items = [];
if ( $("#announcements").length ){
  var audience = ( $("#announcements").data("audience").toLowerCase() ? $("#announcements").data("audience").toLowerCase() : 'all' );
  var todayDate = new Date().toLocaleString("en-US", { timeZone: "America/Indianapolis" });
      todayDate = new Date(todayDate);

  var announcements = $.getJSON("/announcements/json/announcements.json", {_: new Date().getTime()}, function(d){
    $.each(d, function(i, item){
      var announcement = '';
      // Get difference from TODAY with Created Date
      var created = new Date(item.created);
      var millisBetween = todayDate.getTime() - created.getTime();
      var days = Math.floor(millisBetween / (1000 * 60 * 60 * 24));
      var hours = Math.floor(millisBetween / (60 * 60 * 1000));
      if ( item.audience.toLowerCase().indexOf(audience) >= 0 || audience == "all"){
        var ellapsed = '';
        if ( hours <= 24 && hours !== 1){
          ellapsed = `${hours} hours ago`;
        } else if ( hours === 1 ) {
          ellapsed = `${hours} hour ago`;
        } else if ( days !== 1) {
          ellapsed = `${days} days ago`;
        } else {
          ellapsed = `${days} day ago`;
        }
        announcement =
        '<button class="o-btn tabs__title accordion__btn" data-toggle="#'+item.id+'" role="tab">'
        +item.title+' - ' + ellapsed + '<svg class="icon accordion__icon accordion__icon--plus"><use xlink:href="#xu-plus"></use></svg><svg class="icon accordion__icon accordion__icon--minus"><use xlink:href="#xu-minus"></use></svg></button>';
        announcement += "<div class='accordion__content' id='"+item.id+"' role='tabpanel'>";
        announcement += "<p>Posted: "+created.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'})+"</p>";
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