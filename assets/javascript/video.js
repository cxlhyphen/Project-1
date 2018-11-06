
    function callYoutubeSearchApi(type){

        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + type + "&type=video&key=AIzaSyDtZJ5dO2lCwvyPRmwTKVeWNKMQRpI31qg";
        var id;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
             console.log("Video ID: " + response.items[0].id.videoId);
             player.loadVideoById(response.items[0].id.videoId);
         });
         

    }

    //untested
    function callYoutubeVideoApi(id){
      
      var queryURL = "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=AIzaSyDtZJ5dO2lCwvyPRmwTKVeWNKMQRpI31qg";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response.data);
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
          'onReady': "",
          'onStateChange': onPlayerStateChange
        }
      });

      $(document).on("click", "#submit", function(e){
          e.preventDefault();
        console.log("press");
        var type = $("#input").val().trim();

        callYoutubeSearchApi(type);

        getTrackId();

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
      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      player.stopVideo();
    }



