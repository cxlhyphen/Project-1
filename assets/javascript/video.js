$(document).ready(function(){

 
    $("#submit").on("click", function(e){
        e.preventDefault();

        var type = $("#input").val().trim();
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + type + "&type=video&key=AIzaSyDtZJ5dO2lCwvyPRmwTKVeWNKMQRpI31qg";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
             console.log(response.items[0].id.videoId);
         });

    });




});