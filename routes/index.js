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

router.get('/neo/best-year', function(req, res){//?hazardous=(true|false)
	if(typeof req.query.hazardous !== 'undefined' && req.query.hazardous !== null){
		EarthObj.aggregate([{"$match": {"is_hazardous": req.query.hazardous}}, {"$group": {"_id":{"year": {"$substr":["$date", 0, 4] } },"count": {"$sum": 1}}},{"$sort":{"count": -1}}], function(err, resp){
			res.send(resp[0]["_id"]);
		});
	}
	else{
		EarthObj.aggregate([{"$match": {"is_hazardous": false}}, {"$group": {"_id":{"year": {"$substr":["$date", 0, 4] } }, "count": { "$sum": 1}}}, {"$sort":{"count": -1}}], function(err, resp){
			res.send(resp[0]["_id"]);
		});
	}
});

router.get('/neo/best-month', function(req, res){//?hazardous=(true|false)
	if(typeof req.query.hazardous !== 'undefined' && req.query.hazardous !== null){
		EarthObj.aggregate([{"$match": {"is_hazardous": req.query.hazardous}}, {"$group": {"_id":{"month": {"$substr":["$date", 5, 2] } },"count": {"$sum": 1 }}},{"$sort":{"count": -1}}], function(err, resp){
			res.send(resp[0]["_id"]);
		});
	}
	else{
		EarthObj.aggregate([{"$match": {"is_hazardous": false}}, {"$group": {"_id":{"month": {"$substr":["$date", 5, 2] } }, "count":{"$sum": 1 }}},{"$sort":{"count": -1}}], function(err, resp){
			res.send(resp[0]["_id"]);
		});
	}
});

// extra route added to check functionality for best-day
//since year may not be reflecting changes while testing now

router.get('/neo/best-day', function(req, res){//?hazardous=(true|false)
	if(typeof req.query.hazardous !== 'undefined' && req.query.hazardous !== null){
		EarthObj.aggregate([{"$match": {"is_hazardous": req.query.hazardous}}, {"$group": {"_id":{"day": {"$substr":["$date", 8, 2] } }, "count": {"$sum": 1 }}},{"$sort":{"count": -1}}], function(err, resp){
			res.send(resp[0]["_id"]);
		});
	}
	else{
		EarthObj.aggregate([{"$match": {"is_hazardous": false}}, {"$group": {"_id":{"day": {"$substr":["$date", 8, 2] } }, "count": { "$sum": 1 }}}, {"$sort":{"count": -1}}], function(err, resp){
			res.send(resp[0]["_id"]);
		});
	}
});

module.exports = router;