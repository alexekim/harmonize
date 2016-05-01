var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  favorites: [],
  picture: String,
  info: [{
    video: String,
    name: String,
    primary: String,
    secondary: String,
    links: String,
    aspirations: String,
    location: String,
    genres: String,
    keywords: String
  }]
})

var User = mongoose.model('User', userSchema);

module.exports = User;
