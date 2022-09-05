module.exports.home = function(req, res){
    return res.end('<h1> Express is up for Codeial! </h1>');
}

module.exports.user = function(req, res){
    return res.end('<h1> user created </h1>');
}