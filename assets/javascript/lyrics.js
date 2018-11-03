//Create variables to store artist + track input and track iD

var artist = "";
var track = "";

var trackId = "";

//query IDs !site needs to be hosted before it will work
var idQuery = "https://api.musixmatch.com/ws/1.1/matcher.track.get?format=json&q_artist=bruno%20mars&q_track=finesse&apikey=bacbbf26f7275c4f5760229e42740c9e";

var lyricQuery = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=json&track_id=118611235&apikey=bacbbf26f7275c4f5760229e42740c9e";

//function for AJAX request to find track id

function getTrackId() {
    $.ajax({
        crossDomain: true,
        url: idQuery,
        method: "GET",     
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type"
        }
    }).then(function (response) {

        console.log(response);

        //grab track id number and store in trackID
        trackId = response[0];

        console.log(trackId);


    });

};

//function to request lyrics
function getLyrics() {
    $.ajax({
        url: lyricQuery,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        //grab lyrics body and store in a div

        //grab copywright data and store in a div

        //append to body

    });

};

getTrackId();

getLyrics();