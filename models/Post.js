const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postTitle: {
    type: String,
    max: 1000,
    required: true,
    trim: true,
  },
  postDesc: {
    type: String,
    required: true,
  },

  postImage: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
    trim: true,
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "Comment",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
