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

var lyrdeos = {
  "xnKhsTXoKCI": {
    track: "master of puppets",
    artist: "metallica",
    lyricId: "17037948"
  }
};

const storageName = "lyrdeos";

function setLinks() {

if(localStorage.getItem(storageName)){
  lyrdeos = JSON.parse(localStorage.getItem("lyrdeos"));
  console.log(Object.keys(lyrdeos));
  displayHistory();
}

}

function addStorage() {

  if (localStorage.getItem("videoLinks")) {
    localStorage.removeItem("videoLinks")
  }

  localStorage.setItem(storageName, JSON.stringify(lyrdeos));

  setLinks();

  console.log(localStorage.getItem(storageName));
}

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  if (!localStorage.getItem(storageName)) {
    addStorage();
  } else {
    setLinks();
  }

}
else {
  // Too bad, no localStorage for us
}

function deleteHistory(){

  localStorage.removeItem(storageName);
  lyrdeos = {};
  displayHistory();
}

function displayHistory() {
  console.log("DISPLAYING")

  $("#trackName").html("");
  console.log(lyrdeos)
  for (let i in lyrdeos) {

    if (i.length > 5 && i.length < 20) {

      var data = $("<td>")
      var link = $("<a>");
      // link.attr("href", "https://www.youtube.com/watch?v=" + i);
      // link.attr("target", "_blank")
      link.attr("data-yt", i);
      link.attr("data-lyric", lyrdeos[i].lyricId);
      link.attr("data-artist", lyrdeos[i].artist);
      link.attr("data-track", lyrdeos[i].track);
      link.addClass("col-4 lyrdeo-link");

      //  var title = $("<p>");
      //title.addClass("col-2")
      // link.text(song.snippet.title);
      var img = $("<img>");
      img.addClass("img-responsive");
      img.attr("src", "https://i.ytimg.com/vi/" + i + "/default.jpg");
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
    if (!Object.keys(lyrdeos).includes(id)) {
      lyrdeos[id] = {
        track: track,
        artist: artist
      };
      addStorage();
    }
    getTrackId(artist, track, id);
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

//function for AJAX request to find track id
function getTrackId(artist, track, ytId) {

  //query IDs
  var idQuery = "https://api.musixmatch.com/ws/1.1/matcher.track.get?format=jsonp&callback=callback&q_artist=" + artist + "&q_track=" + track + "&apikey=bacbbf26f7275c4f5760229e42740c9e";

  console.log(idQuery);

  $.ajax({
    crossDomain: true,
    url: idQuery,
    method: "GET",
    dataType: "jsonp"
  }).then(function (response) {

    var status = response.message.header.status_code
    console.log(status);

    //if status = 404, append a unavaliable message to the lyrics box
    if (status == 404) {
      var errorMsg = $('<div>');
      errorMsg.html("Sorry, lyrics are unavaliable. :(<br>");
      $("#lyrics").empty();
      $("#lyrics").append(errorMsg);
    }
    //else, get lyrics
    else {

      //grab track id number and store in trackID
      let track = response.message.body.track;
      console.log(track.track_name);
      console.log(track.artist_name);
      let trackId = track.track_id;
      
        lyrdeos[ytId].lyricId = trackId;
        addStorage();
      
      console.log(trackId);
      getLyrics(trackId);
    }

  });

};

//function to request lyrics
function getLyrics(trackId) {
  $("#lyrics").empty();

  var lyricQuery = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + trackId + "&apikey=bacbbf26f7275c4f5760229e42740c9e";

  $.ajax({
    crossDomain: true,
    url: lyricQuery,
    method: "GET",
    dataType: "jsonp"
  }).then(function (response) {

    //console.log(lyricQuery);
    //console.log(response);

    //grab lyrics body, convert \n to breaks and store in a div
    var copyright = response.message.body.lyrics.lyrics_copyright;

    var lyrics = JSON.stringify(response.message.body.lyrics.lyrics_body);
    lyrics = lyrics.replace(new RegExp("\\\\n", "g"), "<br />");

    console.log(lyrics);
    //console.log(copyright);

    var lyricsDiv = $("<div>");
    lyricsDiv.html(lyrics);
    lyricsDiv.append("<br />");
    lyricsDiv.append(copyright);

    //append to body
    $("#lyrics").append(lyricsDiv);

  });
};



$(document).on("click", "#submit", function (e) {
  e.preventDefault();
  console.log("press");
  var artist = $("#artist").val().trim().toLowerCase();
  var track = $("#track").val().trim().toLowerCase();
  $("#artist").val("");
  $("#track").val("");



  callYoutubeSearchApi(artist, track);
 

});

$(document).on("click", ".lyrdeo-link", function (e) {
  e.preventDefault();
  const link = $(this);
  player.loadVideoById(link.attr("data-yt"));
  getLyrics(link.attr("data-lyric"));
  $("#artist").val(link.attr("data-artist"));
  $("#track").val(link.attr("data-track"));

});

$(document).on("click", "#delete-history", function(e){
  e.preventDefault();
  if(confirm("Are you sure you want to delete your lyrdeo history?")){
    deleteHistory();
  }
})

$(document).ready(function () {
  $("#artist").val("");
  $("#track").val("");
  displayHistory();
})
