
    function callYoutubeSearchApi(type){
      type += "unofficial";
      var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + type + "&type=video&key=AIzaSyDtZJ5dO2lCwvyPRmwTKVeWNKMQRpI31qg";
      console.log("CALLLING")
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(response){
        console.log(response)
          var id = response.items[0].id.videoId;
           console.log("Video ID: " + id);
           callYoutubeVideoApi(id);
           player.loadVideoById(id);
       });
       

  } 

  //untested
  function callYoutubeVideoApi(id){
    console.log(id)
    var queryURL2 = "https://www.googleapis.com/youtube/v3/video?part=snippet&id=" + id + "&key=AIzaSyDtZJ5dO2lCwvyPRmwTKVeWNKMQRpI31qg";
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response){
      
      console.log(response);
    })
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
    });

    $(document).on("click", "#submit", function(e){
        e.preventDefault();
      console.log("press");
      var artist = $("#artist").val().trim();
      var track = $("#track").val().trim();
      var term = artist + " " + track;
      callYoutubeSearchApi(term);
   
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    
  }
  function stopVideo() {
    player.stopVideo();
  }



