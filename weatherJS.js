'use strict'

$(document).ready(init);

function init() {
  console.log('init works.');
  //$("").on('keypress', inputKeypress); Would this ruin mobile responsive?
  $('button').click(goClicked);
}

function goClicked() {
  console.log("Button clicked");

  var zip = $("input.form-control#zipCode").val();
  console.log('zip is: ',zip);


  var promise = $.getJSON("http://api.wunderground.com/api/0a5af13171ab6bbf/geolookup/conditions/forecast/q/UnitedStates"+zip+".json");

  promise.success(function(data) {

    var results = data;
    console.log('success.');
    $("h4").removeClass("hidden");
    $("#temperature").text(results.current_observation.feelslike_string);
    $("#high").text(results.forecast.simpleforecast.forecastday[0].high.fahrenheit);
    $("#weather").text(results.current_observation.display_location.full);
    var imgURL = results.forecast.simpleforecast.forecastday[0].icon_url;

    console.log('imgURL is: ',imgURL);
    $("img").attr("src", imgURL);

  });
  promise.fail(function(error) {
    $("#location").text("try again.");
    console.log('error is: ', error);
  });
  promise.always(function(data) {
    //place anything you want to do after this request here. Especially if it's something you want to do, regardless of the request success or failure.
    console.log('always data: ', data);
  });
}
