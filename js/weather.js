var apiKey = require('./../.env').apiKey;

function Weather() {
}

Weather.prototype.getWeather = function(city, displayFunction, type) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
    if(type === "humidity") {
      displayFunction(city, response.main.humidity);
    }
    if (type === "celsius" || type === "fahrenheit") {
      var kelvin = response.main.temp;
      var tempType;
      if (type === "celsius") {
        tempType = (kelvin - 273.15).toFixed(2);
      }
      if (type === "fahrenheit") {
        tempType = (kelvin * (9/5) - 459.67).toFixed(2);
      }
      displayFunction(city, tempType);
    }
    }).fail(function(error) {
      $('.showWeather').text(error.responseJSON.message);
    });
}

Weather.prototype.getForecast = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&cnt=5&appid=' + apiKey).then(function(response) {
    displayFunction(response.list[0].temp.max, response.list[1].temp.max, response.list[2].temp.max, response.list[3].temp.max, response.list[4].temp.max, response.list[0].temp.min, response.list[1].temp.min, response.list[2].temp.min, response.list[3].temp.min, response.list[4].temp.min);

    console.log(response);
    console.log(JSON.stringify(response));
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
  });
}

exports.weatherModule = Weather;
