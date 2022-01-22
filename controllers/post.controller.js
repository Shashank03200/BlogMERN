const createError = require("http-errors");
const cloudinary = require("../helpers/cloudinary_init");
const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, desc } = req.body;
    const postFile = req.file;
    console.log(req.file.path);
    const result = await cloudinary.uploader.upload(postFile.path, {
      folder: "blog",
    });

    const newPost = await new Post({
      userId,
      postTitle: title,
      postDesc: desc,
      postImage: result.url,
      public_id: result.public_id,
    });

    const uploadedPost = await newPost.save();

    // const foundUser = await User.findById(userId);

    await User.updateOne(
      { _id: userId },
      { $push: { blogPosts: uploadedPost.id } }
    );

    const foundPost = await Post.findById(uploadedPost.id).populate("userId");
    const completePost = {
      ...foundPost._doc,
      postDeletePossible: true,
    };

    return res.status(200).json({
      sucess: true,
      data: completePost,
    });
  } catch (error) {
    next(error);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    const userId = req.userId;
    const postId = req.params.postId;
    const foundPost = await Post.findById(postId);

    if (!foundPost) {
      throw createError.BadRequest();
    } else {
      const postUserId = foundPost.userId;
      if (postUserId.toString() !== userId.toString()) {
        throw createError.Unauthorized();
      }
      let result = undefined;
      const public_id = foundPost.public_id;
      if (req.file) {
        await cloudinary.uploader.destroy(public_id, {
          resource_type: "image",
          type: "upload",
          invalidate: true,
        });
        result = await cloudinary.uploader.upload(req.file.path);
      }

      console.log({ title, desc });

      await Post.updateOne(
        { _id: postId },
        {
          userId,
          postTitle: title || foundPost.postTitle,
          postDesc: desc || foundPost.postDesc,
          public_id: result ? result.public_id : foundPost.public_id,
          postImage: result ? result.url : foundPost.postImage,
        }
      );

      res.status(200).json({
        success: true,
        msg: "Post updated",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const userId = req.userId;
    const postId = req.params.postId;

    const foundPost = await Post.findById(postId);
    if (foundPost.userId.toString() !== userId) {
      throw createError.Unauthorized();
    }

    res.status(200).json({
      success: true,
      data: foundPost,
    });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const userId = req.userId;
    const postId = req.params.postId;

    const foundPost = await Post.findById(postId);
    if (foundPost.userId.toString() !== userId) {
      throw createError.Unauthorized();
    }

    const public_id = foundPost.public_id;

    await Post.deleteOne({ _id: postId });

    await User.updateOne({ _id: userId }, { $pull: { blogPosts: postId } });

    await cloudinary.uploader.destroy(public_id, {
      resource_type: "image",
      type: "upload",
      invalidate: true,
    });

    res.status(200).json({
      sucess: true,
      msg: "Post deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  editPost,
  getPost,
  deletePost,
};
