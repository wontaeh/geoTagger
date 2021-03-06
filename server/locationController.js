const Location = require('../models/locationSchema');

const appConfig = require('../config.json');

var googleMapsClient = require('@google/maps').createClient({
  key: appConfig.googleMap.apiKey
});

const locationController = {};
locationController.addLocation = (req, res, next) => {
  console.log('req.body in addlcation: ', req.body);
  let locationData = {};
  if(req.body.name) {
    locationData.name = req.body.name;
  }
  if(req.body.tags) {
    locationData.tags = req.body.tags.slice();
  }
  if(req.body.username) {
    locationData.username = req.body.username;
  }
  googleMapsClient.geocode({
    address: req.body.name
  }, function(err, response) {
    locationData.googleInfo = [];
    if(!err) locationData.googleInfo.push(response.json.results[0].formatted_address);
    // Save in DB
    let createLocation = new Location({
      name: locationData.name,
      googleInfo: locationData.googleInfo,
      tags: locationData.tags,
      username: locationData.username
    });
    createLocation.save((dbErr) => {
      if(dbErr) {
        console.log('err',dbErr);
        res.json(locationData);
      } else {
        console.log('no err');
        res.json(locationData);
      }
    });
  });
};

// locationController.getLocations = (req, res, next) => {
//   let locations = [];
//   Location.find({}, (err, locations) => {
//     if(!err) {
//       console.log('locations: ',locations);
//       res.send(locations);
//     } else {
//       res.send([]);
//     }
//   });
// };

locationController.getLocations = (req, res, next) => {
  let locations = [];
  console.log('req.body in getLocations: ', req.body.username);
  Location.find({username: req.body.username}, (err, locations) => {
    if(!err) {
      console.log('locations: ',locations);
      res.send(locations);
    } else {
      res.send([]);
    }
  });
};


module.exports = locationController;

