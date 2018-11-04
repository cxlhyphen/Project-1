//on submit button click, grab variables, and run get track id function
    //should we combine style sheets or create a new one to run the submit on click event??

//Create variables to store artist + track input and track iD
var artist = "adele";
var track = "hello";

var trackId = "";

//query IDs !site needs to be hosted before it will work
var idQuery = "https://api.musixmatch.com/ws/1.1/matcher.track.get?format=jsonp&callback=callback&q_artist=" + artist + "&q_track=" + track + "&apikey=bacbbf26f7275c4f5760229e42740c9e";


//function for AJAX request to find track id
function getTrackId() {
    $.ajax({
        crossDomain: true,
        url: idQuery,
        method: "GET",
        dataType: "jsonp"
    }).then(function (response) {

        //grab track id number and store in trackID
        trackId = response.message.body.track.track_id;

        //console.log(trackId);

        getLyrics();

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
        
        //console.log(lyrics);
        //console.log(copyright);

        var lyricsDiv = $("<div>");
        lyricsDiv.html(lyrics);
        lyricsDiv.append("<br />");
        lyricsDiv.append(copyright);

        //append to body
        $("#lyrics").append(lyricsDiv);

    });
};

getTrackId();

