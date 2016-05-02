var express = require('express');
var controller = express.Router();
var UserAccount = require('../models/schema');
var bcrypt = require('bcrypt');
var Salt = bcrypt.genSaltSync(10);
var dbSalt = bcrypt.genSaltSync(10);

/* GET users listing. */
controller.get('/', function(req, res, next) {
  // res.send('HEY HEY HEY BABY');
  res.render('loginregister', { title: 'melody: Register', greeting: 'suh dude' });
});

controller.get('/login', function(req, res, next) {
  res.render('login', { title: 'melody: Login', greeting: 'suh dude' });
});

//JOSH LOGOUT
// ------------------------------------------------------------------
controller.get('/logout', function(req, res, next) {
  // req.session.user = null;
  // res.json({ 'message': 'You have been logged out.'});
  res.send('loggedout', {message: 'You have been logged out. Hope to see you soon.'})
});
// ------------------------------------------------------------------




// JOSH Register
// ------------------------------------------------------------------
controller.post('/register', function(req, res, next) {
  console.log(req.body.username);
  UserAccount.findOne({ username: new RegExp('^'+req.body.username+'$', "i")}, function(err, user) {
      var regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,100}$/;
      if (user) {
        if (user.username.toLowerCase() === req.body.username.toLowerCase()) {
          // res.json({'message': 'The username already exists'});
          res.render('registererror', { message: 'The username already exists'  })

        }
      } else if (req.body.passwordHash.length < 6) {
        // res.json({'message': 'The password is shorter than 6 characters'});
        res.render('registererror', { message: 'The password is shorter than 6 characters'})
      } else if (!regExp.test(req.body.passwordHash)) {
        // res.json({'message': 'Password must contain a special chracter(!@#$%^&*) and a number'});
        res.render('registererror', { message: "Password must contain a special chracter(!@#$%^&*) and a number"})
      } else {
        var user = new UserAccount({
          username: req.body.username,
          email: req.body.email,
          passwordHash: bcrypt.hashSync(req.body.passwordHash, Salt)})
        user.save(function (err) {
          if (err) {
            return console.log(err);
          } else {
            // res.json({'message': 'You have successfully registered an account!'})
            // res.redirect('/contribute', {message: "You have successfully registered an account!"} )
            // res.render('contribute', {message: "You have successfully registered an account!"} )
            res.render('registersuccess', { message: "You have successfully registered an account!"  })
          }
        });
      }
  });
});
// END JOSH registered
// ------------------------------------------------------------------





// JOSH'S login
// ------------------------------------------------------------------
// controller.post('/login', function(req, res, next) {
//   //bcrypt.compareSync
//   var userInfo = {
//     email: req.body.email,
//     password: req.body.password
//   };
//   UserAccount.findOne({ username: new RegExp('^'+req.body.email+'$', "i")  }, function(err, user) {
//     // if we find our user.. compare passwords!
//     console.log(user)
//     var isPasswordValid = bcrypt.compareSync(userInfo.password, user.passwordHash);
//     if (isPasswordValid) {
//       // log user in
//       req.session.user = user.username;
//       console.log(req.session);
//       // res.json({ 'message': 'Logged in successfully'});
//       res.render('registersuccess', {message: 'Thanks for logging in!'})
//     } else {
//       // res.json({ 'message': 'Invalid username and/or password'});
//       res.render('registererror', {message: 'Invalid username and/or password'})
//     }
//   });
// });

// END JOSH login
// ------------------------------------------------------------------

// CAM login
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
// END CAM login
// ------------------------------------------------------------------


module.exports = controller;
