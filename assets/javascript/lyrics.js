//Create variables to store artist + track input and track iD

var artist = "";
var track = "";

var trackId = "";

//query IDs !site needs to be hosted before it will work
var idQuery = "https://api.musixmatch.com/ws/1.1/matcher.track.get?apikey=bacbbf26f7275c4f5760229e42740c9e&format=json&q_track=shape%20of%20you";

var lyricQuery = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=bacbbf26f7275c4f5760229e42740c9e&format=json&track_id=129992602";

//function for AJAX request to find track id

function getTrackId() {
    $.ajax({
        url: idQuery,
        method: "GET"
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