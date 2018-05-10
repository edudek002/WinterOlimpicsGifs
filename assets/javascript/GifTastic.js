//====================== WINTER SPORTS GIFS ===============================================================

var topics =["skiing", "biathlon", "bobsleigh", "cross country skiing", "curling", "figure skating", "freestyle skiing", "ice hockey", "luge", "nordic combined", "speed skating"];

// function that creates sports buttons


function renderButtons(){

    $("#sports").empty();

        for (var i=0; i<topics.length; i++){

      var button = $("<button>");
      button.addClass("mySport");
      button.attr("data-sport", topics[i]);
      button.text(topics[i]);
      $("#sports").append(button);
      console.log(topics[i])
    };
}

renderButtons();

//Click event creates 10 sport gifs and places them in 2 columns


$("#sports").on("click", ".mySport", function(){

  $("#GifsGoHere1").empty();
  $("#GifsGoHere2").empty();

  var x = $(this).data("sport"); 
  console.log(x);

  

  $("#currentSport").text(x);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=HE1t8YdXXknxgszYouwP2djjPBCZUfix&limit=10";

  console.log(queryURL);

  //Ajax call for specified gifs from Giphy API.

  $.ajax({
          url: queryURL,
          method: "GET"})
         .done(function(response) {

          for (var i=0; i<response.data.length; i++){

            var sportsDiv = $("<div>");
            sportsDiv.addClass("resize"); 
            var p = $("<p>").text("Rating: " + response.data[i].rating);

            var sportsImage = $("<img>");
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            sportsImage.attr("src", still);
            sportsImage.attr("data-still", still);
            sportsImage.attr("data-animated", animated);
            sportsImage.attr("data-now", "still");
            sportsImage.addClass("searchImage");
            sportsDiv.append(p);
            sportsDiv.append(sportsImage);

            //Add the first 5 gifs retrieved from the giphy API.
            if (i >= 0 && i < 5) {
              $("#GifsGoHere1").append(sportsDiv);
            }
            //Add the last 5 gifs retrieved from the giphy API.
            else {
              $("#GifsGoHere2").append(sportsDiv);
            }
          }
  });  

})

//Using the input form to add new sports


$("#addSport").on("click", function(){
  event.preventDefault();
  var newSport = $("#search-input").eq(0).val();
  topics.push(newSport);
  renderButtons();
  return false;

})

//Animating gifs and stopping them from moving 

$(document).on("click", ".searchImage", function(){
  var now = $(this).attr("data-now");

  if (now =="still"){
    $(this).attr("src", $(this).data("animated"));
    $(this).attr("data-now","animated");
  } 

  else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-now","still");
  
  }
})





