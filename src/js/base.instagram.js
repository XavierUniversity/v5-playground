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