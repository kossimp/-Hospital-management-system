
const express = require('express');
const router = express.Router();
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
const User = require('./../server/models/user.js');

/*
    GET / -> 进入登陆页面
*/
router.get('/', (req, res) => {
    res.render('login', {layout: false});
});


/*
    POST /login -> 对用户进行身份验证 
*/

router.post('/login',
    passport.authenticate('local'), 
    function(req, res) {
        // 如果调用此函数，则验证成功
        // `req.user` contains the authenticated user.
        
        if(req.user.username == "admin"){
            res.render('admin/adminindex',{layout:"adminlayout",username:req.user.username});
        }
        else{
            res.render('user/userindex',{username:req.user.username});
        }
    }
);


// the Middleware for authetification -> provided by the passport library
passport.use(new LocalStrategy(
  function(username, password, done) {
      User.getUserByUsername(username, function(err, user) {
          if (err) {
              throw err;
          }
          if (! user) {
              //     done(error, found the user)
              return done(null, false, {message: "Unknown User"});
          }

          User.comparePassword(password, user.password, function (err, isMatch) {
              if (err) {
                  throw err;
              }
              if (isMatch) {
                  return done(null, user);
              } else {
                  return done(null, false, 'Invalid password');
              }
          });
      });
  }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
});

module.exports = router;
