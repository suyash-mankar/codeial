const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.home = async function (req, res) {
  try {
    // Populate the user of each post
    let posts = await Post.find({})
      // to display the latest post at top after refreshing
      .sort("-createdAt")
      .populate("user")
      // Also populate the likes of each post and comment
      .populate({
        path: "comments",
        // further populate
        populate: [
          {
            path: "user",
          },
          {
            path: "likes",
          },
        ],
      })
      .populate("likes");

    for (let post of posts) {
      post.comments.sort(function (a, b) {
        return b.createdAt - a.createdAt;
      });
    }

    let users = await User.find({});

    let friendships = [];

    // if the user is logged in
    if (req.user) {
      // query to further populate 'to_user' and 'from_user' in 'friendships'
      let query = [
        {
          path: "to_user",
        },
        {
          path: "from_user",
        },
      ];

      // populate the 'friendship field', 'to_user' and 'from_user field' of signed in user
      let signedIn_user = await req.user.populate({
        path: "friendships",
        populate: query,
      });

      // Logged i user friendships array (send it to home page to display logged in user's friends)
      friendships = signedIn_user.friendships;
    }

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
      friendships: friendships,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
