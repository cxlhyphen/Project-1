
function callYoutubeSearchApi(artist, track) {
  var type = '"' + artist + '" ' + '"' + track + '"' ;
  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + type + "&type=video&key=AIzaSyDtZJ5dO2lCwvyPRmwTKVeWNKMQRpI31qg";
  console.log("CALLLING")
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    var id = response.items[0].id.videoId;
    console.log("Video ID: " + id);

    player.loadVideoById(id);
    
  
  });


}

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {

  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  })
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {

}

function stopVideo() {
  player.stopVideo();
}



$(document).on("click", "#submit", function (e) {
  e.preventDefault();
  console.log("press");
  var artist = $("#artist").val().trim();
  var track = $("#track").val().trim();
  
  callYoutubeSearchApi(artist, track);
 
  //getTrackId();

});




