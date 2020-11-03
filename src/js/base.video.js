// Need to see if we are on a mobile device. If we aren't, let's post the video!
var vid = document.querySelector(".hero video");
if ( !detectmob() && vid !== null ) { 
  var button = document.createElement("button");
  button.innerHTML = '<span class="sr-only">Pause Video</span><svg height="32" width="32" fill="white"><use xlink:href="#xu-pause"/></svg>';
  button.style.cssText = "position: absolute; bottom: 3rem; right: 5rem; z-index: 1; padding: 1rem;";
  button.className = "o-btn";
  button.addEventListener('click', function(e){
    if ( vid.paused ) {
      vid.play();
      button.innerHTML = '<span class="sr-only">Play Video</span><svg height="32" width="32" fill="white"><use xlink:href="#xu-pause"/></svg>';
      dataLayer.push({'event' : 'customEvent', 'eventCategory' : 'BG Video', 'eventAction' : 'click', 'eventLabel' : 'play'});
    } else {
      vid.pause();
      button.innerHTML = '<span class="sr-only">Pause Video</span><svg height="32" width="32" fill="white"><use xlink:href="#xu-play"/></svg>';
      dataLayer.push({'event' : 'customEvent', 'eventCategory' : 'BG Video', 'eventAction' : 'click', 'eventLabel' : 'pause'});
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