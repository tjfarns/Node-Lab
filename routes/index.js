var express = require('express');
var fs = require('fs');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});

/* GET cities. */
router.get('/getcity', function(req, res, next) {
  var myRe = new RegExp("^" + req.query.q);
  fs.readFile(__dirname + '/cities.dat.txt', function(err, data) {
    if (err) throw err;
    var cities = data.toString().split("\n");
    var jsonresult = [];
    for (var i = 0; i < cities.length; i++) {
      var result = cities[i].search(myRe);
      if (result != -1) {
        jsonresult.push({city:cities[i]});
      }
    }
    res.status(200).json(jsonresult);
  });
});


var definition = "https://owlbot.info/api/v1/dictionary/";
router.get('/definition', function(req,res) {
  console.log("In definition");
  request(definition + req.query.q + '?format=json').pipe(res);
});

module.exports = router;
