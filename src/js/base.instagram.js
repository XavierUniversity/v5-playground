var insta = $("[data-image]").data("image");
$.get("https://api.instagram.com/oembed?url=" + insta + "&hidecaption=true&omitscript=true", function(d){
  var parent = $("[data-image='"+ insta +"']");
  console.log(parent);
  parent.css({"background-image": 'url("' +d.thumbnail_url + '")', "background-size": 'cover'});
  parent.find(".feature__content").attr('href', insta);
  parent.find(".feature__name").html('<span class="feature__link">'+ '<img src="images/news/instagram.png" style="padding-right:.3rem;">' + d.author_name + '</span>');
  parent.find(".feature__caption").html(d.title);
});

