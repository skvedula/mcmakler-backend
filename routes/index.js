var express = require('express');
var router = express.Router();
var EarthObj = require('../models/neo');

// Get Homepage
router.get('/', function(req, res){
	res.send({'hello': 'world'});
});

// All routes speicified 
router.get('/neo/hazardous', function(req, res){
	EarthObj.find({"is_hazardous": true}, function(err, resp){
		res.send(resp);
	});
});

router.get('/neo/fastest', function(req, res){//?hazardous=(true|false)
	if(typeof req.query.hazardous !== 'undefined' && req.query.hazardous !== null){
		EarthObj.find({"is_hazardous": req.query.hazardous}, function(err, resp){
			res.send(resp[0]);
		}).sort({"speed": -1});
	}
	else{
		EarthObj.find({"is_hazardous": false}, function(err, resp){
			res.send(resp[0]);
		}).sort({"speed": -1});
	}
});


module.exports = router;