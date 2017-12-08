var mongoose = require('mongoose');

var PlaylistSchema = new mongoose.Schema({
  name: String,
  songs: [{type: mongoose.Schema.Types.Object, ref:"Song"}],
  isPublic: Boolean,
  beschrijving: String
});

PlaylistSchema.methods.addSong = function(song) {
  this.songs.push(song);
}

PlaylistSchema.methods.removeSong = function(song) {
  this.songs.splice(this.songs.indexOf(song), 1);
}

mongoose.model('Playlist', PlaylistSchema);
