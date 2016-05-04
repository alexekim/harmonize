var express = require('express');
var controller = express.Router();
var UserAccount = require('../models/schema');
var bcrypt = require('bcrypt');
var Salt = bcrypt.genSaltSync(10);
var dbSalt = bcrypt.genSaltSync(10);
var methodOverride = require('method-override');


/* GET users listing. */
controller.get('/', function(req, res, next) {
  check = req.session.currentUser;
  // res.send('HEY HEY HEY BABY');
  res.render('loginregister', { check: check, title: 'melody: Register', greeting: 'suh dude' });
});

// LOGIN PAGE GET
// ------------------------------------------------------------------
controller.get('/login', function(req, res, next) {
  check = req.session.currentUser;
  res.render('login', { check:check, title: 'melody: Login', greeting: 'suh dude' });
});

// LOGOUT
// ------------------------------------------------------------------
controller.get('/logout', function(req, res, next) {
  console.log('before logout:')
  console.log(req.session);
  console.log("req.session.loggedIn :" + req.session.loggedIn)
  if (req.session.loggedIn === true) {
    req.session.loggedIn = null;
    req.session.currentUserId = null;
    req.session.currentUser = null;
    console.log('after logout')
    console.log(req.session);
    console.log('You have been logged out.');
    res.render('loggedout', {title: 'melody: Logged Out', message: 'You have been logged out. Hope to see you soon.'})
  } else {
    res.render('loggedout', {title: 'melody: Logged Out', message: 'You have been logged out. Hope to see you soon.'})
  }
})
// controller.get('/logout', function(req, res, next) {
//   // req.session.user = null;
//   // res.json({ 'message': 'You have been logged out.'});
//   res.render('loggedout', {title: 'melody: Logged Out', message: 'You have been logged out. Hope to see you soon.'})
// });
// END LOGOUT
// ------------------------------------------------------------------




// Register POST
// ------------------------------------------------------------------
controller.post('/register', function(req, res, next) {
  check = req.session.currentUser;
  console.log(req.body.username);
  UserAccount.findOne({ username: new RegExp('^'+req.body.username+'$', "i")}, function(err, user) {
      var regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,100}$/;
      if (user) {
        if (user.username.toLowerCase() === req.body.username.toLowerCase()) {
          // res.json({'message': 'The username already exists'});
          res.render('registererror', { check: check, title: 'Try Again', message: 'The username already exists'  })

        }
      } else if (req.body.passwordHash.length < 6) {
        check = req.session.currentUser;
        // res.json({'message': 'The password is shorter than 6 characters'});
        res.render('registererror', { check: check, title: 'Try Again', message: 'The password is shorter than 6 characters'})
      } else if (!regExp.test(req.body.passwordHash)) {
        check = req.session.currentUser;
        // res.json({'message': 'Password must contain a special chracter(!@#$%^&*) and a number'});
        res.render('registererror', { check: check, title: 'Try Again', message: "Password must contain a special chracter(!@#$%^&*) and a number"})
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
            check = req.session.currentUser;
            var currentUser = user.username;
            console.log("--------------------------------------------------------")
            console.log("req.session: START")
            console.log(req.session)
            console.log("req.session: END")
            console.log("--------------------------------------------------------")
            console.log("currentUser: " + currentUser);
            console.log("req.session.loggedIn: " + req.session.loggedIn);
            console.log("req.session.currentUserId: " + req.session.currentUserId);
            console.log("req.session.chartID: " + req.session.chartID);
            console.log("--------------------------------------------------------")
            // res.json({'message': 'You have successfully registered an account!'})
            // res.redirect('/contribute', {message: "You have successfully registered an account!"} )
            // res.render('contribute', {message: "You have successfully registered an account!"} )
            res.render('registersuccess', { check: check, title: 'Welcome', message: "Welcome to melody, " + req.body.username  })
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
        check = req.session.currentUser;
        res.render('loginsuccess', {check: check, message: 'Thank you for logging in, ' + req.session.currentUser })
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


// ------------------------------------------------------------------
// GET for UPDATE PROFILE
// ------------------------------------------------------------------
controller.get('/updateprofileform', function(req, res, next) {
  UserAccount.findOne({ username: req.session.currentUser }, function(err, docs) {
    if (!err){
      console.log("----------docs start-------------")
      console.log(docs);
      console.log("----------docs end-------------")
      if(docs.username)
      var username = docs.username;
      var video = docs.video;
      var location = docs.location;
      var name = docs.name;
      var act = docs.act;
      var primary = docs.primary;
      var secondary = docs.secondary;
      var links = docs.links;
      var aspirations = docs.aspirations;
      var genres = docs.genres;
      var keywords = docs.keywords;
      check = req.session.currentUser;

      // res.json("hi")
      res.render('registersuccess', {
        title: 'melody: Login',
        message: "Welcome to melody, " + req.session.currentUser,
        check: check,
         username: username,
         video: video,
         location: location,
         name: name,
         act: act,
         primary: primary,
         secondary: secondary,
         links: links,
         aspirations: aspirations,
         genres: genres,
         keywords: keywords
    });
    } else {
      // throw err;
    res.render('error', {message: 'Profile not found'});
  }
});
})


  // UserAccount.findOne({ username: req.session.currentUser }, function(err, docs) {
  // res.render('registersuccess', { title: 'melody: Login', message: "Welcome to melody, " + req.body.username  });
// });
// END
// ------------------------------------------------------------------



// EDIT PROFILE. UPDATE FUNCTION
// ------------------------------------------------------------------
controller.put('/update', function(req, res) {
  console.log('update was clicked')
  var userInfo = {
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
    console.log('req.session:')
    console.log(req.session);
    console.log('req.session.currentUser:')
    console.log(req.session.currentUser);
    currentUser = req.session.currentUser;
    if (err) console.log(err);
    console.log("userinfo:")
    console.log(userInfo);
    video = userInfo.video;
    console.log("userInfo.video")
    console.log(userInfo.video)
    location = userInfo.location;
    name = userInfo.name;
    act = userInfo.act;
    primary = userInfo.primary;
    secondary = userInfo.secondary;
    links = userInfo.links;
    aspirations = userInfo.aspirations;
    genres = userInfo.genres;
    keywords = userInfo.keywords;
    check = req.session.currentUser;
    // res.send(userInfo);
    // res.render('yourprofile', { currentUser: currentUser, video: video, location: location, name: name, act: act, primary: primary, secondary: secondary, links: links, aspirations: aspirations, genres: genres, keywords: keywords })
    res.redirect('/users/profile')
  })
  // res.json(userInfo);
//   res.render('index', { 'message': 'Account has been updated' })
})
// END

// ------------------------------------------------------------------
//add to favorites
controller.put('/favorite', function(req, res){
  console.log('--------------------')
  console.log(req.body);
  console.log(req.body.username);
  console.log('--------------------')
  var fave = req.body.username;
  console.log(fave);

  UserAccount.findOneAndUpdate({ username: req.session.currentUser }, {$push: {favorites: fave}}, {safe: true, upsert: true}, function(err, users){
    console.log("users:::::" + users);
    console.log('--------------------')

    // console.log(req.session.currentUser + " added: " fave.fave + " to favorites");
    if (err) console.log(err);
    res.send(fave);
  })
})
// ------------------------------------------------------------------




controller.get('/profile', function(req, res, next) {
  UserAccount.findOne({ username: req.session.currentUser }, function(err, docs) {
    if (!err){
        if (docs === null){
          res.render('error', {message: "you're probably not logged in anymore"})
        }
        else{
        console.log(docs);
        console.log(docs.username);
        var username = docs.username;
        var video = docs.video;
        var location = docs.location;
        var name = docs.name;
        var act = docs.act;
        var primary = docs.primary;
        var secondary = docs.secondary;
        var links = docs.links;
        var aspirations = docs.aspirations;
        var genres = docs.genres;
        var keywords = docs.keywords;
        check = req.session.currentUser;

        // res.json(docs);
        res.render('yourprofile', { check:check, username: username, video: video, location: location, name: name, act: act, primary: primary, secondary: secondary, links: links, aspirations: aspirations, genres: genres, keywords: keywords })
        }
    } else {
      // throw err;
    res.json('bye');
  }
});
})


// LIST ALL MUSICIANS
// ------------------------------------------------------------------
controller.get('/all', function(req, res, next) {
  UserAccount.find({}, function(err, docs) {
    if (!err){
        console.log(docs);
        // res.json(docs);
        // res.render('browse', { message: docs[1].username})
        res.render('browse', { musicians: docs})
    } else {
      // throw err;
      res.json('bye');
    }
  });
})
// END
// ------------------------------------------------------------------

// LIST ONE MUSICIAN BY ID
// ------------------------------------------------------------------
controller.get('/:id', function(req,res, next){
  UserAccount.findOne({ username: req.params.id }, function(err, docs){

    if(!err){
      console.log(docs);
      if (docs === null ){
        res.render('error', {message: "Sorry, that is inaccessible."})
      }
      else{

      var username = docs.username;
      var video = docs.video;
      var location = docs.location;
      var name = docs.name;
      var act = docs.act;
      var primary = docs.primary;
      var secondary = docs.secondary;
      var links = docs.links;
      var aspirations = docs.aspirations;
      var genres = docs.genres;
      var keywords = docs.keywords;
      check = req.session.currentUser;
      // res.json(docs);
      res.render('yourprofile', {check: check, username: username, video: video, location: location, name: name, act: act, primary: primary, secondary: secondary, links: links, aspirations: aspirations, genres: genres, keywords: keywords })
    }
    }
    else{
      // throw err;
      res.json('bye');
    }
  })
})

// DELETE
// controller.delete('/delete', function(req, res) {
//   User.findOneAndRemove({ email: req.session.user }, req.session, function(err, user) {
//     if (err) console.log(err);
//     res.json({ 'message': 'Account has been deleted' })
//   })
// })
//END

module.exports = controller;
