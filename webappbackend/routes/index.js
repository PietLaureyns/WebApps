var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

let Song = mongoose.model('Song');

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

//router.delete('/api/songs/:recipe', function (req, res, next) {
//  Song.remove({ _id: { $in: req.recipe.ingredients } }, function (err) {
//    if (err) return next(err);
//    req.recipe.remove(function (err) {
//      if (err) { return next(err); }
//      res.json(req.recipe);
//    });
//  })
//})


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
