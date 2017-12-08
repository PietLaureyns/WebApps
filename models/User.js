let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true },
  hash: String,
  salt: String,
  firstname: String,
  lastname: String,
  description: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  recentActions: [{ type: mongoose.Schema.Types.Object, ref: "Action" }]
});

UserSchema.methods.addPlaylistId = function(playlistId) {
   this.playlists.push(playlistId);
}

UserSchema.methods.removePlaylistId = function (playlistId) {
  this.playlists.splice(this.playlists.indexOf(playlistId), 1);
}

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(32).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt,
    10000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt,
    10000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, process.env.SECRET);
};

mongoose.model('User', UserSchema);
