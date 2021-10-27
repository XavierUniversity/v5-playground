// AJAX form submissions
$(".form--ajax").on('submit', function(e){
  e.preventDefault();
  $form = $(this);
  url = '/includes/data';
  $.ajax({
    type: "POST",
    url: url,
    data: $form.serialize()
  }).always(function(d, t, j){
  }).done(function(d, t, j){
    $("#message").removeClass();
    $("#message").addClass('alert alert--' + d.status);
    $("#message").html('<div class="alert--'+d.status+'__icon"><span class="fa" aria-hidden="true"></span></div><div class="alert__content"><p>' + d.message + '</p></div>');
    try{
      if ( d.status == "success" && typeof reloadLocation !== "undefined" ){
        window.location.href = reloadLocation;
        return false;
      }
    }catch(err){}
    if ( d.status == "success" && ($form.attr('id') == "login-form" || $form.attr('id') == "parent-link-form") ) {
      window.location.reload();
    }
    setTimeout(removeMessage,10000);
  }).fail(function(j, t){
    $("#message").removeClass();
    $("#message").addClass('alert alert--danger');
    $("#message").html('<div class="alert--danger__icon"><span class="fa" aria-hidden="true"></span></div> <div class="alert__content"><p>There was an error processing your request. Please try again later.</p></div>');
    setTimeout(removeMessage,5000);
  });
});

$(".form--ajax--lookup").on('submit', function(e){
  e.preventDefault();
  $form = $(this);
  url = '/includes/data';
  $.ajax({
    type: "POST",
    url: url,
    data: $form.serialize()
  }).always(function(d, t, j){
  }).done(function(d, t, j){
    $("#results").html(d.content);
  });
});

function removeMessage(){
  $("#message").html('');
  $("#message").removeClass();
}