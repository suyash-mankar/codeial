const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new Strategy for google login 
passport.use(new googleStrategy({
        clientID: "555662117399-hpj435qat8reu1t626l6umqm4eusnui7.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    }, 

    function(accessToken, refreshToken, profile, done){
        
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('Error in google strategy passport', err);
                return;
            }

            if(user){
                // if found, set this user as req.user
                return done(null, user);
            }else{

                // if not found , create the user and set it as req.user
                return User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log('Error in creating user (google strategy passport)', err);
                        return;
                    }

                    return done(null, user);

                });
            }


        });
    }


));

module.exports = passport;
