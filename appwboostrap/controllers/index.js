var express = require('express');
var controller = express.Router();

/* GET home page. */
controller.get('/', function(req, res, next) {
  check = req.session.currentUser;
  res.render('index', { check: check, title: 'melody: musician connect', greeting: 'suh dude' });
});

controller.get('/hey', function(req, res, next) {
  res.render('violin', { title: 'melody: musician connect', greeting: 'suh dude' });
});

controller.get('/settings', function(req, res, next){
  if (req.session.loggedIn === true) {
    user = "for "+req.session.currentUser;
    check = req.session.currentUser;
    console.log(user);
    res.render('settings', { check: check, title: 'Settings', user: user,  message: 'You have been logged out. Hope to see you soon.'})
  } else {
    check = req.session.currentUser;
    res.render('pleaselogin', {check: check, title: 'Settings', message: 'Please log in or register first'})
  }
})

module.exports = controller;
