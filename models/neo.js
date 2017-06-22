var mongoose = require('mongoose');

// User Schema
var NeoSchema = mongoose.Schema({
	date: {
		type: String,
		index:true
	},
	reference: {
		type: String
	},
	name: {
		type: String
	},
	speed: {
		type: String
	},
	is_hazardous: {
		type: Boolean
	}
});

var EarthObj = module.exports = mongoose.model('neo_data', NeoSchema);

module.exports.insert = function(obj, callback){
	EarthObj.update(obj, { upsert: true }, callback);
}