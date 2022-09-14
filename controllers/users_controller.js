
const User = require('../models/user')

module.exports.profile = function(req, res){

    User.findById(req.params.id, function(err, user){
        return res.render('users_profile', {
            title: "User Profile",
            profile_user: user
        });
   
    });
}



module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){

            req.flash('success', 'Name and email successfully updated!');
            return res.redirect('back');
        })
    }else{

        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

    


// render the sign up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){

        req.flash('success', 'You are already signed in!');
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        req.flash('success', 'You are already signed in!');
        return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create = function(req,res){

    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match!');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        
        if(err){
            req.flash('error', err);
            return res.redirect('back');
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    req.flash('error', err);
                    return res.redirect('back');
                }

                req.flash('success', 'User successfully created!');
                
                return res.redirect('/users/sign-in');
            })
        }else{

            req.flash('success', 'You have already signed up, continue to login');
            return res.redirect('back');
        }
    })


}

// Sign in and create the session for the user
module.exports.createSession = function(req,res){

    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');    
}



module.exports.destroySession = function(req, res){

    //logout function given to req by passport js
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });

    req.flash('success', 'You have logged out');

    return res.redirect('/');
}



