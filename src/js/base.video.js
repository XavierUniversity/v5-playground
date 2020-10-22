// Need to see if we are on a mobile device. If we aren't, let's post the video!
if ( !detectmob() ){
  var vid = $(".hero video");
  if ( vid.length > 0 ){
    vid.html('<source src="'+vid.data("bgvideo") + '" type="video/mp4" />');
  }
}
// Video Button -- for things like Campus Life / Diversity
$("#vid-btn").click(function(){
    $("#video-overlay iframe").attr('src', $(this).data('video'));
    $("#video-overlay").show();
});
// Video Overlay
$("#close-video-overlay").click(function(){
    $("#video-overlay").hide();
    $("#video-overlay iframe").attr('src','');  
});