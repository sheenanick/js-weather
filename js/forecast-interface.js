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
