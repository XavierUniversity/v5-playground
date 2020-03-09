var instas = $("[data-image]");
if ( instas.length > 0 ){
  for ( var i = 0; i < instas.length; i++){
    var insta = $(instas[i]).data('image');
    $.get("https://api.instagram.com/oembed?url=" + insta + "&hidecaption=true&omitscript=true", function(d){
      var parent = $("[data-image='"+ insta +"']");
      parent.css({"background-image": 'url("' + insta + 'media?size=l")', "background-size": 'cover'});
      parent.find(".news--feature__content").attr('href', insta);
      parent.find(".news--feature__name").html('<span class="news--feature__link">'+ '<svg height="45" width="46"><use xlink:href="#xu-instagram"></use></svg>' + d.author_name + '</span>');
      parent.find(".news--feature__caption").html(d.title.slice(0, 100) + ( d.title.length > 100 ? "&hellip;" : ''));
    });
  }
}

var custInstas = $("[data-insta]");
var parent;
if ( custInstas.length > 0 ){ 
  $.each(custInstas, function(i, k){
    console.log(k);

    $.get('https://api.instagram.com/oembed?url='+$(k).data("insta")+'&hidecaption=true&omitscript=true', function(d){
      $(k).css({ 'background-image' : 'url(' + $(k).data('insta') +  'media?size=l)'});
      $(k).html('<a class="ctaTile__link" href="'+$(k).data('insta')+'" target="_blank" rel="nofollow noreferrer"><div class="ctaTile__content"><p class="ctaTile__text">'+d.title+'</p></div></a>');
    });
  });
}