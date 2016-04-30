var express = require('express');
var controller = express.Router();

/* GET home page. */
controller.get('/', function(req, res, next) {
  res.render('index', { title: 'Project...', greeting: 'suh dude' });
});

controller.get('/oldindex', function(req, res, next){
  res.render('oldindex', {title: 'Project...', greeting: 'suh dude'});
});

module.exports = controller;
