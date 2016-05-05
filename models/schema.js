var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    passwordHash: String,
    favorites: [],
    picture: String,
    video: String,
    location: String,
    name: String,
    act: String,
    primary: String,
    secondary: String,
    links: String,
    aspirations: String,
    genres: String,
    keywords: String,
    images: String
  })

var User = mongoose.model('User', userSchema);

module.exports = User;
