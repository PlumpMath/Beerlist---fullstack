var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dadadatabase');

var Beer = require("./BeerModel");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));  

app.use(express.static('public'));

app.use('/node_modules', express.static('node_modules'));

app.get('/beers', function (req, res) {
  Beer.find({}, function (error, beers) {
  // console.log (beers)
  res.send(beers);
  });
});

app.post('/beers', function (req, res) {

  var beer = new Beer(req.body);

  beer.save(function (err, x) {
    if (err) {
      res.send (err)
    } else {
      res.send(x);
    };
  });
});

app.delete('/beers/:id', function(req, res) {
  var beerId = req.params.id;
  
  Beer.remove({_id:beerId}, function(err) {
    if (err) {
      res.send (err)
    } else {
      res.end()
    };
  });
});

app.listen(8000, function () {
  console.log ('lalalala')
});