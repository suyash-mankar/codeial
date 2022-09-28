const nodemailer = require('../config/nodemailer');


// Create a function to send the mail

//  This is another way of exporting a method
exports.resetPassword = (resetPasswordToken) => {

    let htmlString = nodemailer.renderTemplate({resetPasswordToken: resetPasswordToken}, '/reset_password/reset_password.ejs');

    nodemailer.transporter.sendMail({
        from: 'facebooklite.tech@gmail.com',
        to: resetPasswordToken.user.email,
        subject: "Reset your password",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        // console.log('Mail delivered', info);
        return;
    });
            
}