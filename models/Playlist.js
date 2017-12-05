var mongoose = require('mongoose');

var PlaylistSchema = new mongoose.Schema({
  name: String,
  songs: [{type: mongoose.Schema.Types.Object, ref:"Song"}],
  //songIds: [String],
  isPublic: Boolean,
  beschrijving: String
});

mongoose.model('Playlist', PlaylistSchema);
