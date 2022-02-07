const createError = require("http-errors");
const User = require("../models/User");
const Post = require("../models/Post");
const cloudinary = require("../helpers/cloudinary_init");

const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      throw createError.NotFound();
    }
    res.status(200).json({
      success: true,
      msg: "Logged In",
      data: {
        ...foundUser._doc,
        owner: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      throw createError.NotFound();
    }
    res.status(200).json({
      success: true,
      data: {
        ...foundUser._doc,
        owner:
          req.userId !== undefined &&
          req.userId.toString() === userId.toString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const tokenUserId = req.userId;
    const foundUser = await User.findById(userId).populate("blogPosts");
    if (!foundUser) {
      throw createError.NotFound();
    }
    const foundPosts = foundUser.blogPosts;
    let modifiedBlogPosts = [];
    if (foundPosts !== []) {
      modifiedBlogPosts = foundPosts.map((post) => {
        return {
          ...post._doc,
          postDeletePossible: post._doc.userId.toString() === tokenUserId,
        };
      });
    }
    res.status(200).json({
      success: true,
      data: modifiedBlogPosts,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const paramUserId = req.params.userId;
    if (userId !== paramUserId) {
      throw createError.Unauthorized();
    }
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      throw createError.NotFound();
    }
    console.log(foundUser);
    const blogPostIds = foundUser.blogPosts;
    const blogPostDeletePromises = blogPostIds.map((blogPostId) => {
      return Post.deleteOne({ _id: blogPostId });
    });

    // Deleting all the posts of this user.
    await Promise.all(blogPostDeletePromises);

    await User.deleteOne({ _id: userId });
    res.status(200).json({
      success: true,
      msg: "Account Deleted",
    });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const paramUserId = req.params.userId;
    if (userId !== paramUserId) {
      throw createError.Unauthorized();
    }
    const foundUser = await User.findById(userId).select("+password");
    console.log(foundUser);
    const { firstName, lastName, password, dob } = req.body;

    if (!foundUser) {
      throw createError.NotFound();
    }

    let result = undefined;

    if (req.file) {
      if (foundUser.userPublicId) {
        console.log("Deleting Image");
        await cloudinary.uploader.destroy(foundUser.userPublicId, {
          resource_type: "image",
          type: "upload",
          invalidate: true,
        });
      }
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: `blog/profile/${userId}`,
      });
    }

    await User.updateOne(
      { _id: userId },
      {
        firstName: firstName || foundUser.firstName,
        lastName: lastName || foundUser.lastName,
        dob: dob || foundUser.dob,
        password: password || foundUser.password,
        userPublicId: result ? result.public_id : foundUser.userPublicId,
        profilePicture: result ? result.url : foundUser.profilePicture,
      }
    );

    res.status(200).json({
      success: true,
      msg: "Account updated",
    });
  } catch (error) {
    next(error);
  }
};

const setPreferences = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { interests } = req.body;

    console.log(typeof interests);
    interests.forEach(async (interest) => {
      await User.updateOne(
        { _id: userId },
        {
          $push: { interest: interest },
        }
      );
    });

    return res.status(200).json({
      success: true,
      msg: "Preferences updated",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  getCurrentUser,
  editUser,
  getAllPosts,
  deleteUser,
  setPreferences,
};
