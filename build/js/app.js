(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "41f83d40758977785ee41f153c3ae9a5";

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
var Weather = require('./../js/weather.js').weatherModule;

var displayForecast = function(max1, max2, max3, max4, max5, min1, min2, min3, min4, min5) {
  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "theme2",//theme1
    title:{
      text: "Five Day Forecast (min-max temperatures)"
    },
    animationEnabled: false,   // change to true
    data: [
    {
      // Change type to "bar", "area", "spline", "pie",etc.
      type: "column",
      dataPoints: [
        { label: "d1 min",  y: min1  },
        { label: "d1 max", y: max1  },
        { label: "d2 min",  y: min2  },
        { label: "d2 max", y: max2  },
        { label: "d3 min",  y: min3  },
        { label: "d3 max", y: max3  },
        { label: "d4 min",  y: min4  },
        { label: "d4 max", y: max4  },
        { label: "d5 min",  y: min5  },
        { label: "d5 max", y: max5  }
      ]
    }
    ]
  });
  chart.render();
}

$(function() {
  var currentWeatherObject = new Weather();
  var city;
  $('#weatherLocation').click(function() {
    event.preventDefault();
    currentWeatherObject.getForecast(city, displayForecast);
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

},{"./../js/weather.js":2}]},{},[3]);
