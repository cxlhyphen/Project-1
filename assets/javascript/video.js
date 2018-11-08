function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
}

var links = [];

function setLinks() {


  var string = localStorage.getItem("videoLinks");

  links = string.split(" ");
  console.log(links);
  displayHistory();
}

function addStorage() {

  localStorage.setItem("videoLinks", links.join(" "));

  setLinks();

  console.log(localStorage.getItem("videoLinks"))
}

if (storageAvailable('localStorage')) {
  console.log(!localStorage.getItem("videoLinks"));
  // Yippee! We can use localStorage awesomeness
  if (!localStorage.getItem("videoLinks")) {
    addStorage();
  } else {
    setLinks();
  }

}
else {
  // Too bad, no localStorage for us
}

function displayHistory() { 
  console.log("DISPLAYING")

  $("#trackName").html("");
  console.log(links)
  for (let i in links) {

    if (links[i].length > 5 && links[i].length < 20) {

      var data = $("<td>")
      var link = $("<a>");
      link.attr("href", "https://www.youtube.com/watch?v=" + links[i]);
      link.attr("target", "_blank")
      link.addClass("col-4");

      //  var title = $("<p>");
      //title.addClass("col-2")
      // link.text(song.snippet.title);
      var img = $("<img>");
      img.addClass("img-responsive");
      img.attr("src", "https://i.ytimg.com/vi/" + links[i] + "/default.jpg");
      //link.append(title);

      link.append(img);
      data.append(link);
      $("#trackName").prepend(data);

    }
  }
}

function callYoutubeSearchApi(artist, track) {
  var type = '"' + artist + '" ' + "+" + '"' + track + '"';
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
    links.push(id);
    addStorage();
    displayHistory();
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

$(document).ready(function(){
  displayHistory();
})
