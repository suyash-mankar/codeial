const User = require('../models/user')
const fs = require('fs');
const path = require('path');
const ResetPasswordToken = require('../models/reset_password_token');
const crypto = require('crypto');
const resetPasswordMailer = require('../mailers/reset_password_mailer');


module.exports.profile = function(req, res){

    User.findById(req.params.id, function(err, user){
        return res.render('users_profile', {
            title: "User Profile",
            profile_user: user
        });
   
    });
}



module.exports.update = async function(req,res){ 

    if(req.user.id == req.params.id){

        try{

            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                
                if(err){console.log('*******Multer Error: ', err)}

                user.name = req.body.name;
                user.email = req.body.email;


                if(req.file){
                    
                    if(user.avatar &&  fs.existsSync(path.join(__dirname, '..', user.avatar))){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back'); 

            });



        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


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







module.exports.createResetPasswordToken = async function(req, res){

    try{

        let user = await User.findOne({email: req.body.email});

        if(user){

            let resetPasswordToken = await ResetPasswordToken.create({
                user: user._id,
                accessToken: crypto.randomBytes(20).toString('hex'),
                isValid: true
        });

        await resetPasswordToken.populate('user');

        //send the mail to user 
        resetPasswordMailer.resetPassword(resetPasswordToken);

        req.flash('success', 'Check your mail id to reset password');

        return res.redirect('/');

        
    }else{
        req.flash('error', 'user not found');
        return res.redirect('back');
    }

    }catch(err){
        
            req.flash('error', err);
            return res.redirect('back');
        
    }


}



module.exports.resetPasswordPage = async function(req, res){


    let resetPasswordToken = await ResetPasswordToken.findOne({accessToken: req.params.accesstoken});


    if(resetPasswordToken.isValid){
        
        return res.render('reset_password', {
            title: 'Reset Password',
            resetPasswordToken: resetPasswordToken
        });
        

    }else{
        req.flash('error', 'Token Expired');
        return res.redirect('/');
    }

    
}




module.exports.resetPassword = async function(req, res){

    try{

        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }


        let resetPasswordToken = await ResetPasswordToken.findOne({accessToken: req.params.accesstoken});

        await resetPasswordToken.populate('user');

        if(resetPasswordToken.isValid){
            
            let user = await User.findById(resetPasswordToken.user._id);

            user.password = req.body.password;

            resetPasswordToken.isValid = false;

            resetPasswordToken.save();
            user.save();

            req.flash('success', 'Password changed successfully');
            return res.redirect('/users/sign-in');

        }else{

            req.flash('error', 'token expired');
            return res.redirect('/');
        }

    }catch(err){
   
        req.flash('error', err);
        return res.redirect('back');
        
    }

    
}











