const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    await post.populate("user");

    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created!",
      });
    }

    req.flash("success", "Post published!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    if (post.user == req.user.id) {
      // delete the associated likes for the post and all its comments and likes too
      await Like.deleteMany({ likeable: post, onModel: "Post" });

      // delete every document from Like collection where likeable value is anything from the post.comment array which stores the comment id
      await Like.deleteMany({ likeable: { $in: post.comments } });

      post.remove();
      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted",
        });
      }

      req.flash("success", "Post and associated comments deleted!");
      return res.redirect("back");
    } else {
      req.flash("error", "You cannot delete this post!");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
