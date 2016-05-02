var express = require('express');
var controller = express.Router();
var UserAccount = require('../models/schema');
var bcrypt = require('bcrypt');
var Salt = bcrypt.genSaltSync(10);
var dbSalt = bcrypt.genSaltSync(10);
var methodOverride = require('method-override');


/* GET users listing. */
controller.get('/', function(req, res, next) {
  // res.send('HEY HEY HEY BABY');
  res.render('loginregister', { title: 'melody: Register', greeting: 'suh dude' });
});

// LOGIN PAGE GET
// ------------------------------------------------------------------
controller.get('/login', function(req, res, next) {
  res.render('login', { title: 'melody: Login', greeting: 'suh dude' });
});

// LOGOUT
// ------------------------------------------------------------------
controller.get('/logout', function(req, res, next) {
  // req.session.user = null;
  // res.json({ 'message': 'You have been logged out.'});
  res.send('loggedout', {title: 'melody: Logged Out', message: 'You have been logged out. Hope to see you soon.'})
});
// END LOGOUT
// ------------------------------------------------------------------




// Register POST
// ------------------------------------------------------------------
controller.post('/register', function(req, res, next) {
  console.log(req.body.username);
  UserAccount.findOne({ username: new RegExp('^'+req.body.username+'$', "i")}, function(err, user) {
      var regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,100}$/;
      if (user) {
        if (user.username.toLowerCase() === req.body.username.toLowerCase()) {
          // res.json({'message': 'The username already exists'});
          res.render('registererror', { title: 'Try Again', message: 'The username already exists'  })

        }
      } else if (req.body.passwordHash.length < 6) {
        // res.json({'message': 'The password is shorter than 6 characters'});
        res.render('registererror', { title: 'Try Again', message: 'The password is shorter than 6 characters'})
      } else if (!regExp.test(req.body.passwordHash)) {
        // res.json({'message': 'Password must contain a special chracter(!@#$%^&*) and a number'});
        res.render('registererror', { title: 'Try Again', message: "Password must contain a special chracter(!@#$%^&*) and a number"})
      } else {
        var user = new UserAccount({
          username: req.body.username,
          email: req.body.email,
          passwordHash: bcrypt.hashSync(req.body.passwordHash, Salt)})
        user.save(function (err) {
          if (err) {
            return console.log(err);
          } else {
            req.session.loggedIn = true;
            req.session.currentUserId = user._id;
            req.session.currentUser = user.username;
            req.session.chartID;
            var currentUser = user.username;
            console.log("currentUser: " + currentUser);
            console.log("req.session.loggedIn: " + req.session.loggedIn);
            console.log("req.session.currentUserId: " + req.session.currentUserId);

            // res.json({'message': 'You have successfully registered an account!'})
            // res.redirect('/contribute', {message: "You have successfully registered an account!"} )
            // res.render('contribute', {message: "You have successfully registered an account!"} )
            res.render('registersuccess', { title: 'Welcome', message: "Welcome to melody, " + req.body.username  })
          }
        });
      }
  });
});
// END register POST
// ------------------------------------------------------------------



// LOGIN POST
// ------------------------------------------------------------------
controller.post('/login', function(req, res, next) {
  UserAccount.findOne({ email: req.body.email }, function(err, user) {
    console.log(user)
    console.log('LALALALALLA')
    if (user) {
      var enteredPassword = req.body.passwordHash;
      var comparison = bcrypt.compareSync(enteredPassword, user.passwordHash);
      if (comparison === true) {
        req.session.loggedIn = true;
        req.session.currentUserId = user._id;
        req.session.currentUser = user.username;
        req.session.chartID;
        var currentUser = user.username;
        console.log("Welcome to the site, "+ currentUser);
        // res.redirect('/charts/build');
        // res.send("Welcome to the site, "+ currentUser)
        res.render('loginsuccess', {message: 'Thank you for logging in.'})
      } else {
          console.log("The username or password you entered was incorrect.");
          // res.redirect('/login');
          res.send("The username or password you entered was incorrect.")
      }
    } else {
        console.log("User doesn't exist.");
        // res.redirect('/register');
        res.send('user doesnot exist')
      }
  });
})
// END LOGIN POST
// ------------------------------------------------------------------


// EDIT PROFILE. UPDATE FUNCTION
// ------------------------------------------------------------------
controller.put('/update', function(req, res) {
  console.log('update was clicked')
  var userInfo = {
    // username: req.body.username,
    // email: req.body.email,
    // password: bcrypt.hashSync(req.body.password, Salt),
    // favorites: [],
    // picture: String,
    video: req.body.video,
    location: req.body.location,
    name: req.body.name,
    act: req.body.act,
    primary: req.body.primary,
    secondary: req.body.secondary,
    links: req.body.links,
    aspirations: req.body.aspirations,
    genres: req.body.genres,
    keywords: req.body.keywords
  };
  console.log("userinfo: beforeupdate")
  console.log(userInfo);
  UserAccount.findOneAndUpdate({ username: req.session.currentUser }, userInfo, { new: true}, function (err, users) {
    console.log('--------------------------------------------------------------------')
    console.log(users)
    console.log("line 145")
    console.log(req.session.currentUser);
    if (err) console.log(err);
    console.log("userinfo:")
    console.log(userInfo);
    // req.session.user = userInfo.email;
    console.log("userinfo:")
    console.log(userInfo);
    // res.send({ 'message': 'Account has been updated' })
  })
  // res.json('hi')
//   res.render('index', { 'message': 'Account has been updated' })
})



module.exports = controller;
