var express = require('express');
var controller = express.Router();

/* GET home page. */
controller.get('/', function(req, res, next) {
  res.render('index', { title: 'melody: musician connect', greeting: 'suh dude' });
});

// controller.get('/hey', function(req, res, next) {
//   res.render('violin', { title: 'melody: musician connect', greeting: 'suh dude' });
// });

module.exports = controller;
