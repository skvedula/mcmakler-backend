var bodyParser = require('body-parser');
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var nasaApi = require('./nasaApi');
var path = require('path');
var request = require('request');

// mongodb instance running in (mlab)cloud has the neo_datas collection
mongoose.connect('mongodb://skvedula:14mongodb@ds133582.mlab.com:33582/neo');
var db = mongoose.connection;
var routes = require('./routes/index');
var EarthObj = require('./models/neo');

// global variables
var d = new Date();
var d_0 = (new Date()).toISOString().split('T')[0]; // current date in yyyy-mm-dd format
var d_minus_3 = new Date(d.setDate(d.getDate()-3)).toISOString().split('T')[0]; // current date-3

// Init App
var app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

// route provided for updating the db with latest data from nasa api
app.get('/updateDB', function (req, res) {
  nasaApi.getNeoList(function(err,results){
    if (err) console.log(err);
    //for loop to transform to bulk_query
    var bulk_query = []
    for (var i = results.length - 1; i >= 0; i--) {
        bulk_query.push({"updateOne":{"filter": results[i], "update": results[i], upsert: true}});
    };
    EarthObj.bulkWrite(bulk_query, function(err, data){
        if(!err){
            res.write("\n\nObjects found from NASA API for past three days:" + bulk_query.length +"\n\nDuplicate Objects found in DB: "+ data["matchedCount"] + "\n\nNewly Inserted Objects: " + data["upsertedCount"])
        }
        else{
            res.write("Some error occurred");
        }
        res.end();
    });
  },d_minus_3, d_0, 'N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD');
});

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('Server started on port '+app.get('port'));
});
