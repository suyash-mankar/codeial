const nodemailer = require('../config/nodemailer');


// Create a function to send the mail

//  This is another way of exporting a method
exports.newComment = (comment) => {

    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'suyashmankar9@gmail.com',
        to: comment.user.email,
        subject: "new comment published",
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