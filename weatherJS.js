'use strict'

$(document).ready(init);

function init() {
  console.log('init works.');
  $('button').click(clicked);
}
//var navCapability = navigator.geolocation;
var promiseDefaultLoc = $.getJSON("http://api.wunderground.com/api/0a5af13171ab6bbf/geolookup/q/autoip.json");
promiseDefaultLoc.success(function(data) {
    console.log('Default Loc is available and is: ',data.location.zip, data);
  // navigator.geolocation.getCurrentPosition(function(position) {
  //   console.log('position is: '+position);
  //   console.log('testA');
      //var cords = position.coords.latitude, position.coords.longitude;
      $("input.form-control#zipCode").val(data.location.zip);
      console.log('zip shud be replaced.');
});

function clicked() {
  console.log("Button clicked");

  var $zip = $("input.form-control#zipCode").val();
  if ($zip.length !== 5 || /\D/g.test($zip)) {
   $("#weather").text("Incorrect Zip.");
 } else {
    var promise = $.getJSON("http://api.wunderground.com/api/0a5af13171ab6bbf/geolookup/conditions/forecast/q/UnitedStates"+$zip+".json");

    promise.success(function(data) {
      $("h4").removeClass("hidden");
      $("#temperature").text(data.current_observation.feelslike_string);
      $("#high").text(data.forecast.simpleforecast.forecastday[0].high.fahrenheit);
      $("#weather").text(data.current_observation.display_location.full);
      var imgURL = data.forecast.simpleforecast.forecastday[0].icon_url;
      $("img").attr("src", imgURL);
    });
    promise.fail(function(error) {
      $("#weather").text("Try again.");
      console.log('error is: ', error);
    });
    promise.always(function(data) {
      console.log('always data: ', data);
    });
  }
}
