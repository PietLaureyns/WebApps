var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

let Song = mongoose.model('Song');
let Playlist = mongoose.model('Playlist');

/*GET SONG*/
router.get('/api/songs/', function (req, res, next) {
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



/*GET PLAYLIST*/
router.get('/api/playlists/', function (req, res, next) {
  let query = Playlist.find().populate('songs');
  query.exec(function (err, playlists) {
    if (err) return next(err);
    res.json(playlists);
  });
});

/*POST PLAYLIST*/
router.post('/api/playlists/', function (req, res, next) {
  let playlist = new Playlist({ name: req.body.name, isPublic: req.body.isPublic , beschrijving: req.body.beschrijving});
  playlist.save(function (err, post) {
    if (err) { return next(err); }
    res.json(playlist);
  });
});

/*GET PLAYLIST WITH ID*/
router.get('/api/playlist/:id',
  function (req, res, next) {
    Playlist.findById(req.params.id,
      function (err, playlist) {
        if (err) return next(err);
        if (!playlist)
          return next(new Error('not found ' + req.params.id));
        res.json(playlist);
      });
  });

/*DELETE PLAYLIST*/
router.delete('/api/playlists/:id', function (req, res, next) {
  Playlist.remove({ _id: req.params.id },
    function (err, docs) {
      if (err) { res.json(err); }
      res.json(req.playlist);
    });
});


/*ADD SONG TO PLAYLIST*/
router.post('/api/playlists/:playlist/songs', function (req, res, next) {
  Playlist.findById(req.params.playlist, function (err, playlist) {
    if (err) return next(err);
    if (!playlist)
      return next(new Error('not found ' + req.params.playlist));
    playlist.songs.push(req.body);
    let songs2 = playlist.songs;
    playlist.update({ songs: songs2},function (err, post) {
      if (err) { return next(err); }
      res.json(req.body);
    });
  });
});

/*DELETE SONG FROM PLAYLIST*/
router.post('/api/playlists/:playlist/deleteSong', function (req, res, next) {
  Playlist.findById(req.params.playlist, function (err, playlist) {
    if (err) return next(err);
    if (!playlist)
      return next(new Error('not found ' + req.params.playlist));
    playlist.songs.splice(playlist.songs.indexOf(req.body), 1);
    let songs2 = playlist.songs;
    playlist.update({ songs: songs2 }, function (err, post) {
      if (err) { return next(err); }
      res.json(req.body);
    });
  });
});
/*POST SONG TO PLAYLIST*/
//router.post('/api/playlists/:playlist/songs', function (req, res, next) {

//  Playlist.findById(req.params.playlist, function(err, playlist) {
//    if (err) return next(err);
//    if (!playlist)
//      return next(new Error('not found ' + req.params.playlist));
//    playlist.songs.push(req.body);
//  });
//  //console.log(p.name);
//  //let s = Song.findById(req.params.id);
//  //p.songs.push(req.body);
//  //req.playlist.songs.push(s);
//  p.save(function (err, play) {
//    if (err) return next(err);
//    res.json(req.body);
//  });
//});

/*
router.get('/API/recipes/', auth, function(req, res, next) {
  let query = Recipe.find().populate('ingredients');
  query.exec(function(err, recipes) {
    if (err) return next(err);
    res.json(recipes);
  })
});

router.post('/API/recipes/', auth, function (req, res, next) {
  let recipe = new Recipe({name: req.body.name, directions: req.body.directions});
  recipe.save(function(err, post) {
          if (err){ return next(err); }
          res.json(recipe);
      });
  });

  router.param('recipe', function(req, res, next, id) {
    let query = Recipe.findById(id);
    query.exec(function (err, recipe){
      if (err) { return next(err); }
      if (!recipe) { return next(new Error('not found ' + id)); }
      req.recipe = recipe;
      return next();
    });
  });

  router.get('/API/recipe/:recipe', function(req, res) {
    req.recipe.populate('ingredients', function(err, rec) {
      if (err) return next(err);
      res.json(rec);
    });
  });

  router.delete('/API/recipe/:recipe', function(req, res, next) {
    Ingredient.remove({ _id: {$in: req.recipe.ingredients }}, function (err) {
      if (err) return next(err);
      req.recipe.remove(function(err) {
        if (err) { return next(err); }
        res.json(req.recipe);
       });
    })
  })

  
*/

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
