var Weather = require('./../js/weather.js').weatherModule;

var displayHumidity = function(city, humidityData) {
  $('.showWeather').text("The humidity in " + city + " is " + humidityData + "%");
}

$(function() {
  var currentWeatherObject = new Weather();
  $('#weatherLocation').click(function() {
    event.preventDefault();
    var city = $('#location').val();
    // $('#location').val("");
    currentWeatherObject.getWeather(city, displayHumidity, "humidity");
  });
});
