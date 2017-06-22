var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
	res.send({'hello': 'world'});
});

// All routes speicified 
router.get('/neo/hazardous', function(req, res){
	res.send({'hello': 'world'});
});

router.get('/neo/fastest', function(req, res){//?hazardous=(true|false)
	res.send({'hello': 'world'});
});

router.get('/neo/best-year', function(req, res){//?hazardous=(true|false)
	res.send({'hello': 'world'});
});

router.get('/neo/best-month', function(req, res){//?hazardous=(true|false)
	res.send({'hello': 'world'});
});

// extra route added to check functionality 
//since year may not be reflecting changes while testing now

router.get('/neo/best-month', function(req, res){//?hazardous=(true|false)
	res.send({'hello': 'world'});
});

module.exports = router;