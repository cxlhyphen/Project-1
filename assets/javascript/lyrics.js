//Create variables to store artist + track input and track iD
var artist = "bruno mars";
var track = "finesse";

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

        console.log(trackId);

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
        
        console.log(lyricQuery);

        console.log(response);

        //grab lyrics body and store in a div
        var lyrics = response.message.body.lyrics.lyrics_body;
        var copyright = response.message.body.lyrics.lyrics_copyright;
        console.log(lyrics);
        console.log(copyright);
        
        var lyricsDiv = $("<div>");
        lyricsDiv.text(JSON.stringify(lyrics));

        //grab copywright data and store in a div

        //append to body
    

    });
};

getTrackId();

