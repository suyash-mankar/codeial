const nodemailer = require('../config/nodemailer');


//create a function to send the mail

//  This is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside new comment mailer');

    nodemailer.transporter.sendMail({
        from: 'suyashmankar9@gmail.com',
        to: comment.user.email,
        subject: "new comment published",
        html: '<h1> Yup, your comment has been published! </h1>'
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Mail delivered', info);
        return;
    });
            
}