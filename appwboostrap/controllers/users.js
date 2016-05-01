var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('HEY HEY HEY BABY');
  res.render('loginregister', { title: 'melody: Register', greeting: 'suh dude' });
});

router.get('/login/?', function(req, res, next) {
  res.render('login', { title: 'melody: Login', greeting: 'suh dude' });
});

module.exports = router;
