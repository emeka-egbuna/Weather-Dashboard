var searchInput = document.querySelector("#search-input");
var history     = document.querySelector("#history");
var fahrenheit  = "";
var celcius     = "";

var coords      = [];

var defaultCity = "London";

// This function handles events where one button is clicked
$("#search-button").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var location = $("#search-input").val().trim();
/*
  // The movie from the textbox is then added to our array
  var button = $('<button>'+ location +'</button>').attr("class", "btn btn-secondary btn-lg btn-block");
  button.css({ marginBottom: '10px', textTransform: "capitalize"});
  button.attr('id', location);

  button.on('click', function(event){
    displayMovieInfo(location);
  });

  $('#history').append($(button));
*/
  coords.push(location);
  localStorage.setItem("coords", JSON.stringify(coords));
  localStorage.setItem('location', location);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
  displayLocationInfo(location);

  $("#search-input").val('');
});

function displayLocationInfo(city) {
  $("#today").empty();
  $("#forecast").empty();

  localStorage.setItem('location', city);

    var keyAPi = '1476e7a162859170cd5353a67aacca7b';
    var lon    = "";
    var lat    = "";

    // Here we construct our URL
    var geoURL   = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=1&appid="+keyAPi;

    var coordinates = "";
 
    // We then created an Fetch call
    fetch(geoURL)
       .then(function (response) {
         return response.json();
       })
       .then(function (data) {
        lon = JSON.stringify(Math.abs(data[0].lon.toFixed(4)));
        lat = JSON.stringify(Math.abs(data[0].lat.toFixed(4)));

            var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+ lat +"&lon=" + lon +"&appid="+keyAPi;
            //queryURLx = "http:api.openweathermap.org/data/2.5/forecast?q="+ city +",GB&appid="+keyAPi;
        
             // We then created an Fetch call
            fetch(queryURL)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                $("#display-movie").empty();
                $("#today").css({ border: "1px solid #000", padding: "10px", textTransform: "capitalize" });
                var h1 = $('<h1>').text(city + " " + dayjs(data.list[0].dt_txt).format("DD/MM/YYYY"));
                $("#today").append(h1);

                var weatherIcon = data.list[0].weather[0].icon;
                var iconURL = "https://openweathermap.org/img/w/"+ weatherIcon +".png";
                var image       = $('<img>').attr("src", iconURL);
                h1.append(image);
        
                //fahrenheit = data.list[0].main.temp;
                //celcius = 5/9 * (fahrenheit-32);

                var temp = $('<p>').text("Temp: " + data.list[0].main.temp + " ℃");
                $("#today").append(temp);
        
                var wind = $('<p>').text("Wind: " + data.list[0].wind.speed + " KPH");
                $("#today").append(wind);
        
                var humidity = $('<p>').text("Humidity: " + data.list[0].main.humidity + " %");
                $("#today").append(humidity);
        
                var h2 = $('<h2>').text("5-Day Forecast:");
                $("#forecast").append(h2);
        
                for(var i=0; i<data.list.length; i+=8){
                  var forecast = $("<div>").css({
                                            border: "1px solid #000",
                                            padding: "10px",
                                            width: "170px",
                                            marginRight: "30px",
                                            backgroundColor: "#036",
                                            color: "#fff",
                                            boxShadow: "10px 10px 5px #aaaaaa" });
                  var h1 = $('<h4>').text(dayjs(data.list[i].dt_txt).format("DD/MM/YYYY"));
                  forecast.append(h1);

                  var weatherIcon = data.list[i].weather[0].icon;
                  var iconURL = "https://openweathermap.org/img/w/"+ weatherIcon +".png";
                  var image       = $('<img>').attr("src", iconURL).css("display", "block");
                  h1.append(image);
          
                  var temp = $('<p>').text("Temp: " + data.list[i].main.temp + " ℃");
                  forecast.append(temp);
          
                  var wind = $('<p>').text("Wind: " + data.list[i].wind.speed + " KPH");
                  forecast.append(wind);
          
                  var humidity = $('<p>').text("Humidity: " + data.list[i].main.humidity + " %");
                  forecast.append(humidity);

                  $("#forecast").append(forecast);
                }
        
                //$("#today").append($('<div>').text(JSON.stringify(data)));
                
          
                // Create CODE HERE to Log the queryURL
                // Create CODE HERE to log the resulting object
                // Create CODE HERE to calculate the temperature (converted from Kelvin)
                // Create CODE HERE to transfer content to HTML
                // Hint: To convert from Kelvin to Celsius: C = K - 273.15
                // Create CODE HERE to dump the temperature content into HTML
          
            });
    });
    
    function getData() {
      return
    }
 }

// Function for displaying movie data
function renderButtons() {

  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#history").empty();

  coords = JSON.parse(localStorage.getItem('coords'));

  // Looping through the array of movies
  for (var i = 0; i < coords.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var button = $("<button>").attr("class", "btn btn-secondary btn-lg btn-block");
    button.css({ marginBottom: '10px', textTransform: "capitalize"});
    button.attr('id', coords[i]);
    // Adding a class of movie to our button
    //a.addClass("movie");
    // Adding a data-attribute
    button.attr("data-name", coords[i]);
    // Providing the initial button text
    button.text(coords[i]);
    // Adding the button to the buttons-view div
    $("#history").append(button);

    
  }

  $('#history').on('click', 'button', function(event) {
    event.preventDefault();

    displayLocationInfo(event.target.id);
  });
}
renderButtons();

if(localStorage.getItem('location') == null) {
  
} else {
  defaultCity = localStorage.getItem('location');
}

displayLocationInfo(defaultCity);