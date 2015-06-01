var express = require('express');
var passport = require('passport');
var User = require('../app/models/user');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
  res.render('register', {})
});

router.post('/register', function(req, res) {
  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      return res.render('register', {user: user});
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  });
});

router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/')
})

module.exports = router;
