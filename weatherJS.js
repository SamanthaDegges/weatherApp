'use strict'

$(document).ready(init);

function init() {
  console.log('init works.');
  $('button').click(clicked);
  $('input').click(clearText);
}

function clearText() {
  $("input").val('');
  $("input").attr('placeholder', '');
}

// function getFlickrBgImg() {
//   var promiseFlickr = $.getJSON("https://api.flickr.com/services/rest/?method=flickr.test.echo&name=value");
//   promiseFlickr.success(function(data) {
//     flickr.photos.getWithGeoData
//   });
// }

function getWebCamFeed(inputOrDefaultZip) {
  var promise = $.getJSON("https://api.wunderground.com/api/0a5af13171ab6bbf/webcams/q/"+inputOrDefaultZip+".json");
  promise.success(function(data) {
      console.log('webcam is: ',data);
      $("iframe").attr("src", data.webcams[0].CURRENTIMAGEURL);
  });
}

var promiseDefaultLoc = $.getJSON("https://api.wunderground.com/api/0a5af13171ab6bbf/geolookup/q/autoip.json");

promiseDefaultLoc.success(function(data) {
  var defaultLoc = data.location.zip;
  console.log('Default Loc is available and is: ', data);
  $("input.form-control#zipCode").val(data.location.zip);
  console.log('zip shud be replaced.');
  //getFlickrImg(defaultLoc);
  getWebCamFeed(defaultLoc); //dont forget to call this again in the clicked button and pass in the inputzip there.
});

function clicked() {
  console.log("Button clicked");

  var $zip = $("input.form-control#zipCode").val();
  if ($zip.length !== 5 || /\D/g.test($zip)) {
   $("#weather").text("Incorrect Zip.");
 } else {
    var promise = $.getJSON("https://api.wunderground.com/api/0a5af13171ab6bbf/geolookup/conditions/forecast/q/UnitedStates"+$zip+".json");

    promise.success(function(data) {
      if (data.current_observation.feelslike_string) {
        $("h4").removeClass("hidden");
        $("#temperature").text(data.current_observation.feelslike_string);
        $("#high").text(data.forecast.simpleforecast.forecastday[0].high.fahrenheit);
        $("#weather").text(data.current_observation.display_location.full);
        var imgURL = data.forecast.simpleforecast.forecastday[0].icon_url;
        $("img").attr("src", imgURL);
        getWebCamFeed($zip);
      } else {
        $("#weather").text("Incorrect Zip.");
      }
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

//1e590c1e7ab3b7b85deef0f979e8cfbb
// Secret:
// d079115bf5eb5b4c
