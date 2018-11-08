//Create variables to store artist + track input and track iD
var artist = "";
var track = "";

var trackId = "";

//function for AJAX request to find track id
function getTrackId() {

    $("#lyrics").empty();

    artist = $("#artist").val().trim();
    track = $("#track").val().trim();

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

            $("#lyrics").append(errorMsg);
        }
        //else, get lyrics
        else {

            //grab track id number and store in trackID
            trackId = response.message.body.track.track_id;

            //console.log(trackId);
            getLyrics();
        }

    });

};

//function to request lyrics
function getLyrics() {

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

$(document).on("click", "#submit", function (event) {

    event.preventDefault();

    getTrackId();
    // $("#trackName").html("");

    // var userInput = $("#track").val();

    // localStorage.clear();

    // localStorage.setItem("track", userInput);

    // $("#trackName").text(localStorage.getItem("track"));
});
