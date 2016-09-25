var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('landing', { title : "Blockchain for Babies" });
});
router.get('/home', function (req, res) {
    res.render('home', { title : "Blockchain for Babies", user: req.user });
});

router.get('/signup', function(req, res) {
    res.render('signup', {  });
});

router.post('/signup', function(req, res) {
    console.log(req.body);
    if(req.body.password !== req.body.password2) {
        return res.render('signup', { error : "Passwords don't match" });
    }
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.render('signup', { error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/home');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

router.get('/createparent', function(req, res, next) {
  res.render('createparent');
});

router.post('/createparent', function(req, res, next) {
  res.render('createparent');
});

router.get('/createbaby', function(req, res, next) {
  res.render('createbaby');
});

router.post('/createbaby', function(req, res, next) {
  res.render('createbaby');
});

router.get('/configure', function(req, res, next) {
  res.render('configure');
});

router.post('/', function(req, res, next) {
  res.render('configure');
});

module.exports = router;
