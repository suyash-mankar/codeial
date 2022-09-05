module.exports.userPage = function(req, res){
    return res.end('<h1> User Page </h1>')
}

module.exports.profile = function(req, res){
    return res.render('users_profile', {
        title: "User Profile"
    });
}

module.exports.posts = function(req, res){
    return res.end('<h1> User Posts </h1>')
}