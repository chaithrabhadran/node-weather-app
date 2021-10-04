const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hhaXRocmFiaGFkcmFuIiwiYSI6ImNrdTR6aXA3MTAyc2gyc3Bhc3NiOHhrYTkifQ.5X6Nl_yA4LGQorc7S4httQ&limit=1`;
    request({ url, json: true }, (error,{body}) => {
      if (error) {
        callback("Unable to connect to geocode sevice");
      } else if (body.features.length === 0) {
        callback("Unable to find location");
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      }
    });
  };

  module.exports=geocode;