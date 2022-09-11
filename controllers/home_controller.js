const Post = require('../models/post');

module.exports.home = function(req, res){



    // if(!req.isAuthenticated()){
    //     return res.render('home', {
    //         title: "Home Page",
    //         isAuthenticated: req.isAuthenticated()
            
    //     });
    // }

    // else{

        // Post.find({user: req.user.id}, function(err, posts){
        //     if(err){
        //         console.log('error in fetching posts from db');
        //         return;
        //     }
    
        //     return res.render('home', {
        //         title: "Codeial | Home",
        //         name: req.user.name,
        //         isAuthenticated: req.isAuthenticated(),
        //         posts: posts
        //     });
            
        // }) 


        // Populate the user of each post
        Post.find({}).populate('user').exec(function(err, posts){
            if(err){
                        console.log(err);
                        return;
                    }

            
            return res.render('home', {
                title: "Codeial | Home",
                // isAuthenticated: req.isAuthenticated(),
                posts: posts
            });
        })

    }



// }

