const createError = require("http-errors");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const addComment = async (req, res, next) => {
  try {
    const { commentText, postId, userId } = req.body;

    let data = {
      commentText,
      postId,
      userId,
    };

    if (req.body.parentId) {
      data.parentId = req.body.parentId;
    }

    if (req.body.depth) {
      data.depth = req.body.depth;
    }

    const comment = await new Comment(data);
    const result = await comment.save();

    await Post.updateOne(
      { _id: postId },
      {
        $push: { comments: result._id },
      }
    );

    res.status(200).json({
      success: true,
      msg: "Comment added",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res) => {
  try {
    let { commentId, commentText } = req.body;
    await Comment.updateOne(
      { _id: commentId },
      {
        $set: { commentText: commentText },
      }
    );
    res.status(200).json({
      success: true,
      msg: "Comment updated",
    });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    const comments = await Comment.find({ postId }).lean().sort({
      postedDate: 1,
    });

    // return res.json(comments);

    if (!comments) {
      throw createError.NotFound();
    }

    // Used var purposely
    var threads = {};
    var comment = undefined;

    function rec(comment, threads) {
      for (let thread in threads) {
        value = threads[thread];

        if (thread.toString() === comment.parentId.toString()) {
          value.children[comment._id] = comment;

          return;
        }

        if (value.children) {
          rec(comment, value.children);
        }
      }
    }

    for (let i = 0; i < comments.length; i++) {
      comment = comments[i];
      comment.children = {};

      if (tokenUserId)
        comment["owner"] = comment.userId.toString() === tokenUserId.toString();
      else comment["owner"] = false;

      if (!comment.parentId) {
        threads[comment._id] = comment;
        continue;
      }

      rec(comment, threads);
    }

    return res.status(200).json({
      count: comments.length,
      comments: threads,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.body.commentId;
    const foundComment = await Comment.findById(commentId);

    if (req.userId.toString() !== foundComment.userId.toString()) {
      throw createError.Unauthorized();
    }
    // Deleting a comment deletes all the child comments recursively.

    const deleteCommentRec = async (comment) => {
      // Find all the immediate child comments
      const immediateComments = await Comment.find({
        parentId: comment._id,
      });
      console.log(immediateComments);
      // Delete current comment
      await Comment.deleteOne({ _id: comment._id });

      // Recursively call the next comments to be deleted in a DFS manner

      if (immediateComments.length > 0) {
        for (let immediateComment of immediateComments) {
          deleteCommentRec(immediateComment);
        }
      } else {
        return;
      }
    };

    deleteCommentRec(foundComment);
    res.status(200).json({
      success: true,
      msg: "Comment Deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addComment,
  updateComment,
  getComments,
  deleteComment,
};
