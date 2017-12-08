var mongoose = require('mongoose');

var ActionSchema = new mongoose.Schema({
  date: String,
  userName: String,
  type: String,
  playlistId: String,
  songName: String,
  userId: String
});

mongoose.model('Action', ActionSchema);
