$(document).ready(function() {
  var latitude = 0;
  var longitude = 0;
  var tempType = "Centigrade";

  navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // $(".weather").append("<br>Approximate Location:");
    // $(".weather").append("<br>latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
  });

  $("#getWeather").on("click", function() {
    $(".weather").empty();
    $("#weatherAPIData").empty();
    $("#degrees").empty();
    $("#tempSwitch").empty();

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=bc00dc6b7dce5cc286905ae4771e474f&callback=", function(json) {

      var html = "";
      console.log(json.weather[0].main);
      var weatherDescription = json.weather[0].description;
      var weatherIconHtml = "";

      var weatherLocation = json.name + ", " + json.sys.country;

      var weatherTempK = json.main.temp;
      var weatherTempF = ((weatherTempK - 273.15) * 1.80 + 32.00).toFixed(1);
      var weatherTempC = ((weatherTempK - 273.15).toFixed(1));

      $("#weatherAPIData").append(weatherLocation);

      $("#weatherAPIData").append("<br>" + weatherDescription + "<br>");

      //$("#weatherAPIData").append("<br>" + json.weather[0].main);

      $("#degrees").append(weatherTempF + "° F");
      $("#tempSwitch").append(tempType);
      console.log(json.weather[0].main);
      switch (json.weather[0].main) {
        case 'Drizzle':
          $(".sun-shower").css("display", "inline");
          break;
        case 'Thunderstorm':
          $(".thunder-storm").css("display", "inline");
          break;
        case 'Clouds':
          $(".cloudy").css("display", "inline");
          break;
        case 'Snow':
          $(".flurries").css("display", "inline");
          break;
        case 'Rain':
          $(".rainy").css("display", "inline");
          break;
        case 'Clear':
          $(".sunny").css("display", "inline");
          break;
        case 'Atmosphere':
          $("#weatherIcon").append("<img src='http://openweathermap.org/img/w/50n.png'>");
        case 'Haze':
          $("#weatherIcon").append("<img src='http://openweathermap.org/img/w/50n.png'>");
          break;
        default:
          break;
      }
      
     $("#tempSwitch").on("click", function() { 
       if (tempType == "Centigrade") {
         $("#degrees").empty();
         $("#degrees").append(weatherTempC + "° C");
         tempType = "Fahrenheit";
         $("#tempSwitch").html(tempType);
       } else {
       $("#degrees").empty();
        $("#degrees").append(weatherTempF + "° F");
         tempType = "Centigrade";
         $("#tempSwitch").html(tempType);
         
       }
     })
           
       

      var twitterWeatherURL = (weatherTempF + ' degrees in ' + weatherLocation).replace(/[!'()*]/g);

      $('.twitter-share-button').attr('href', 'https://twitter.com/intent/tweet?hashtags=LocalWeather&text=' + encodeURIComponent(twitterWeatherURL));
    });
  });
});