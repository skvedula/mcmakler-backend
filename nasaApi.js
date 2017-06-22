var request = require('request');

//Nasa api request and cherry-pick required fields
exports.getNeoList = function(cb, startDate,endDate,apiKey){
  var options = {
    url: 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + startDate + '&end_date=' + endDate + '&detailed=true&api_key=' + apiKey
  }
  request(options, function(err,res) {
    if (err) {
      console.log("inside error condition", err);
      return cb(err,null);
    }
    var bodyJSON = JSON.parse(res.body);
    var objs = bodyJSON["near_earth_objects"]
    var resp = []
    for (var key in objs) {
      for (var i = 0; i < objs[key].length; i++) { 
        resp.push({"date": key, "reference": objs[key][i].neo_reference_id, "name": objs[key][i].name, "speed": objs[key][i].close_approach_data[0].relative_velocity.kilometers_per_hour, "is_hazardous": objs[key][i].is_potentially_hazardous_asteroid});
      }
    };
    return cb(null,resp);
  });
}