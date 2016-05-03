var express = require('express');
var controller = express.Router();

/* GET home page. */
controller.get('/', function(req, res, next) {
  res.render('index', { title: 'melody: musician connect', greeting: 'suh dude' });
});

controller.get('/hey', function(req, res, next) {
  res.render('violin', { title: 'melody: musician connect', greeting: 'suh dude' });
});

controller.get('/settings', function(req, res, next){
  if (req.session.loggedIn === true) {
    req.session.loggedIn = null;
    req.session.currentUserId = null;
    req.session.currentUser = null;
    res.render('settings', {title: 'Settings', message: 'You have been logged out. Hope to see you soon.'})
  } else {
    res.render('pleaselogin', {title: 'Settings', message: 'Please log in or register first'})
  }
})

module.exports = controller;
