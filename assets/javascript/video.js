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

  displayHistory();
}

function addStorage() {

  localStorage.setItem("videoLinks", links.join(" "));

  setLinks();

}

if (storageAvailable('localStorage')) {

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
 
//clears div html
  $("#trackName").html("");
  //cycle through array of ids
  for (let i in links) {
    //if valid
    if (links[i].length > 5 && links[i].length < 20) {
      //create a table data element that links to youtube and uses a thumbnail
      var data = $("<td>");

      var link = $("<a>");
      link.attr("href", "https://www.youtube.com/watch?v=" + links[i]);
      link.attr("target", "_blank")
      link.addClass("col-4");

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

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    
    var song = response.items[0];
    var id = song.id.videoId;
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
  
  var artist = $("#artist").val().trim();
  var track = $("#track").val().trim();

  callYoutubeSearchApi(artist, track);

  

});

$(document).ready(function(){
  displayHistory();
})
