var instas = $("[data-image]");
if ( instas.length > 0 ){
  for ( var i = 0; i < instas.length; i++){
    var insta = $(instas[i]).data('image');
    $.ajax({
      dataType: "json",
      url: "https://www.xavier.edu/_V5/api/insta.php",
      data: { instagram_post : insta }
    }).done(function(d){
      var parent = $("[data-image='"+ insta +"']");
      parent.css({"background-image": 'url("' + d.thumbnail_url + '")', "background-size": 'cover'});
      parent.find(".news--feature__content").attr('href', insta);
      parent.find(".news--feature__name").html('<span class="news--feature__link">'+ '<svg height="45" width="46"><use xlink:href="#xu-instagram"></use></svg>' + d.author_name + '</span>');
      parent.find(".news--feature__caption").hide();
    });
  }
}