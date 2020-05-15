$('.ajax-logout').on('click', function(e){
  e.preventDefault();
  url = $(this).data('url');
  $.ajax({
    type: "POST",
    url: url,
    data: { 'action': $(this).data('action'), 'token': $(this).data('token') },
  }).always(function(d, t, j){
    window.location.href = "/" + d.destination + "/";
  });
});