var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
  name: String,
  artist: String,
  genre: String,
  year: Number,
  link: String
});

mongoose.model('Song', SongSchema);
