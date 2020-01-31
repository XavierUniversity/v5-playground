// Need to see if we are on a mobile device. If we aren't, let's post the video!
if ( !detectmob() ){
  var vid = $(".hero video");
  if ( vid.length > 0 ){
    vid.html('<source src="'+vid.data("bgvideo") + '" type="video/mp4" />');
  }
}