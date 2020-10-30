// Need to see if we are on a mobile device. If we aren't, let's post the video!
var vid = document.querySelector(".hero video");
if ( !detectmob() && vid !== null ) { 
  var button = document.createElement("button");
  button.innerHTML = '<svg height="32" width="32" fill="white"><use xlink:href="#xu-pause"/></svg>';
  button.style.cssText = "position: absolute; bottom: 3rem; right: 2rem; z-index: 100; padding: 1rem;";
  button.className = "o-btn";
  button.addEventListener('click', function(e){
    if ( vid.paused ) {
      vid.play();
      button.innerHTML = '<svg height="32" width="32" fill="white"><use xlink:href="#xu-pause"/></svg>';
    } else {
      vid.pause();
      button.innerHTML = '<svg height="32" width="32" fill="white"><use xlink:href="#xu-play"/></svg>';
    }
  });
  vid.innerHTML = '<source src="'+vid.getAttribute('data-bgvideo')+'" type="video/mp4" />';
  console.log(vid.parentNode);
  vid.parentNode.appendChild(button);
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