var Weather = require('./../js/weather.js').weatherModule;

var displayTemperature = function(city, temperatureData) {
  $('.showTemperature').text("The temperature in " + city + " is " + temperatureData + " degrees.");
}

$(function() {
  var currentWeatherObject = new Weather();
  var city;
  $('#weatherLocation').click(function() {
    event.preventDefault();
    // $('.showTemperature').show();
    var temp = $('input[name="temp"]:checked').val();
    city = $('#location').val();
    // $('#location').val("");
    currentWeatherObject.getWeather(city, displayTemperature, temp);
  });

  // $('#celsius').click(function() {
  //   event.preventDefault();
  //   $('input[type="radio"]').not(':checked').prop("checked", true);
  //   var temp = $('input[name="temp"]:checked').val();
  //   currentWeatherObject.getWeather(city, displayTemperature, "celsius");
  // });
  //
  // $('#fahrenheit').click(function() {
  //   event.preventDefault();
  //   $('input[type="radio"]').not(':checked').prop("checked", true);
  //   var temp = $('input[name="temp"]:checked').val();
  //   currentWeatherObject.getWeather(city, displayTemperature, "fahrenheit");
  // });
});
