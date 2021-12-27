/*
 	POST /app/adduser -> add a new user in the system
     GET /logout       -> log the user out of the system
*/

const express = require('express');
const router = express.Router();
const _ = require('lodash');
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
const User = require('./../server/models/user.js');

/*
    POST /app/adduser ->  add a new user in the system
*/
router.post('/app/admin/adduser', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

    // validation
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

    // if there are errors, flash messages on the screen
    var errors = req.validationErrors();
    if(errors) {
        res.status(400).redirect('useradmin');
    } else {
        // if everything is OK, create a new user in the database
        var newUser = new User({
            username,
            password
        });

        User.createUser(newUser, function(err, user) {
            if (err) {
				console.log(err);
                return ;
            }
        });

        req.flash('success_msg', 'User succesfully created');
        res.status(200).redirect('/app/admin/adminuser');
    }
});

router.get('/app/getusers', (req, res) => {
    User.find({}, null, {sort: {username: 1}}).then((users) => {

        var usernameJSON = {};

        if (_.isArray(users)) {
            for (var i = 0; i < users.length; ++i) {
                usernameJSON[users[i].username] = users[i].username;
            }
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(usernameJSON));
    }).catch((err) => {
        console.log(err);
        res.status(404).send();
    });
});

router.post('/app/admin/deleteusers', (req, res) => {
    var usersToDelete = req.body.UD;

    if (_.isArray(usersToDelete)) {
        for (var i = 0; i < usersToDelete.length; ++i) {

            var user = usersToDelete[i];
            User.find({
                username: usersToDelete[i]
            }).remove().catch((err) => {
                console.log(err);
            });
        }
        res.status(200).redirect('/app/admin/adminuser');
    } else {
        res.status(400).redirect('/app/admin/adminuser');
    }
});
/*
	GET /app/logout -> function to logout from the system
*/
router.get('/app/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');

    res.status(200).redirect('/');
});

module.exports = router;
