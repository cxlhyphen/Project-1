
function callYoutubeSearchApi(artist, track) {
  var type = '"' + artist + '" ' + "+" + '"' + track + '"' ;
  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + type + "&type=video&key=AIzaSyDtZJ5dO2lCwvyPRmwTKVeWNKMQRpI31qg";
  console.log("CALLLING")
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    var song = response.items[0];
    var id = song.id.videoId;
    console.log("Video ID: " + id);
    var data = $("<td>")
    var link = $("<a>");
    link.attr("href", "https://www.youtube.com/watch?v=" + id);
    link.attr("target", "_blank")
    link.addClass("col-4");

  //  var title = $("<p>");
    //title.addClass("col-2")
   // link.text(song.snippet.title);
    var img = $("<img>");
    img.addClass("img-responsive");
    img.attr("src", song.snippet.thumbnails.default.url);
    //link.append(title);
    
    link.append(img);
    data.append(link);
    $("#trackName").append(data);
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
    videoId: 'xnKhsTXoKCI',
    events: {
      'onReady': "",
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




