const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },

    // This defines the object id of the liked object (the object on which like has been placed)
    likeable: {
      type: mongoose.Schema.ObjectId,
      require: true,
      refPath: "onModel",
    },
    // This field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
      type: String,
      require: true,
      // the value of onModel in each like can be either Post or Comment
      enum: ["Post", "Comment"],
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
