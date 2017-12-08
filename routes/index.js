var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let jwt = require('express-jwt');
let Song = mongoose.model('Song');
let Playlist = mongoose.model('Playlist');
let User = mongoose.model('User');

let auth = jwt({ secret: process.env.SECRET, userProperty: 'payload' });

/*GET SONGS*/
router.get('/api/songs/', auth, function (req, res, next) {
  Song.find(function (err, songs) {
    if (err) { return next(err) };
    res.json(songs);
  });
});

/*POST SONG*/
router.post('/api/songs/', function (req, res, next) {
  let song = new Song(req.body);
  song.save(function (err, post) {
    if (err) { return next(err); }
    res.json(song);
  });
});

/*DELETE SONG*/
router.delete('/api/songs/:id', function (req, res, next) {
  Song.remove({ _id: req.params.id },
    function (err, docs) {
      if (err) { res.json(err); }
      res.json(req.song);
    });
});


/*GET PLAYLIST WITH ID*/
router.get('/api/playlist/:id', auth,function (req, res, next) {
  Playlist.findById(req.params.id, function (err, playlist) {
    if (err) return next(err);
    if (!playlist)
      return next(new Error('not found ' + req.params.id));
    res.json(playlist);
  });
});


/*ADD PLAYLIST TO USER*/
router.post('/api/:userId/playlist/', function (req, res, next) {
  let newPlaylist = new Playlist({ name: req.body.name, isPublic: req.body.isPublic, beschrijving: req.body.beschrijving });
  newPlaylist.save(function (err, playlist) {
    if (err) { return next(err); }
    User.findById(req.params.userId, function (err, user) {
      if (err) { return next(err) };
      user.addPlaylistId(playlist.id);
      user.save({ playlists: user.playlists }, function (err, playlists) {
        if (err) { return next(err); }
        res.json(playlist);
      });
    });
  });
});

/*DELETE PLAYLIST*/
router.delete('/api/:userId/playlist/:id', function (req, res, next) {
  Playlist.remove({ _id: req.params.id }, function (err, docs) {
    if (err) { res.json(err); }
    User.findById(req.params.userId, function (err, user) {
      if (err) { return next(err) };
      user.removePlaylistId(req.params.id);
      user.save({ playlists: user.playlists }, function (err, playlists) {
        if (err) { return next(err); }
        res.json(req.params.id);
      });
    });
  });
});

/*ADD SONG TO PLAYLIST*/
router.post('/api/:userId/playlist/:playlist/song', function (req, res, next) {
    Playlist.findById(req.params.playlist, function (err, playlist) {
      if (err) return next(err);
      if (!playlist)
        return next(new Error('not found ' + req.params.playlist));
      playlist.addSong(req.body);
      playlist.update({ songs: playlist.songs }, function (err, post) {
        if (err) { return next(err); }
        res.json(req.body);
      });
    });
  });

/*DELETE SONG FROM PLAYLIST*/
router.post('/api/:userId/playlist/:playlist/deleteSong', function (req, res, next) {
  Playlist.findById(req.params.playlist, function (err, playlist) {
    if (err) return next(err);
    if (!playlist)
      return next(new Error('not found ' + req.params.playlist));
    playlist.removeSong(req.body);
    playlist.update({ songs: playlist.songs }, function (err, post) {
      if (err) { return next(err); }
      res.json(req.body);
    });
  });
});

/*GET USERS*/
router.get('/api/users/', auth, function (req, res, next) {
  User.find(function (err, users) {
    if (err) { return next(err) };
    res.json(users);
  });
});

/*GET USER WITH ID*/
router.get('/api/user/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) { return next(err) };
    res.json(user);
  });
});

/*ADD ACTION*/

/*REMOVE ACTION*/

/*ADD FRIEND*/

/*REMOVE FRIEND*/

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
