const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.toggleFriendship = async function(req,res){


    try{

        // the post req which will come will be like this - likes/toggle/?profileId=abcdef
        let removed = false;
        let profileId = req.query.profileId;
        let profile_user = await User.findById(profileId);


        // check if a friendship already exists
        let existingFriendshipOneSide = await Friendship.findOne({
            // user = user who is logged in
            from_user: req.user._id,
            to_user: profileId
        });

        let existingFriendshipAnotherSide = await Friendship.findOne({
            // user = user who is logged in
            from_user: profileId,
            to_user: req.user._id
        });



        // if a friendship already exists then delete it
        if(existingFriendshipOneSide){

            let existingFriendship = existingFriendshipOneSide;
            // delete it from the from_user and to_user array also
            req.user.friendships.pull(existingFriendship._id);
            profile_user.friendships.pull(existingFriendship._id);
            req.user.save();
            profile_user.save();
           
            existingFriendship.remove();
            

        }
        
        
        else if(existingFriendshipAnotherSide){
            let existingFriendship = existingFriendshipAnotherSide;

            // delete it from the from_user and to_user array also
            req.user.friendships.pull(existingFriendship._id);
            profile_user.friendships.pull(existingFriendship._id);
            req.user.save();
            profile_user.save();
           
            existingFriendship.remove();
        }
        
        
        else{

            // else make a new friendship
            let newFriendship = await Friendship.create({
                from_user: req.user._id,
                to_user: profileId,
                
            });

            // push the newly created like into the from_user and to_user array array
            req.user.friendships.push(newFriendship._id);

            profile_user.friendships.push(newFriendship._id);

            req.user.save();
            profile_user.save();
            removed = true;

        }


        

        // send this json response to toggle_likes.js
        return res.json(200,{
            message: "Request Successfull!",
            data: {
                removed: removed
            }
        });



    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }




}