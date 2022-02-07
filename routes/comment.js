const commentRouter = require("express").Router();

const {
  validate,
  addCommentValidationRules,
} = require("../helpers/validate_credentials");

const commentController = require("../controllers/comment.controller");
const {
  verifyAccessToken,
  conditionalVerifyAccess,
} = require("../helpers/auth_jwt");

commentRouter.post(
  "/new",
  addCommentValidationRules(),
  validate,
  verifyAccessToken,
  commentController.addComment
);

commentRouter.get(
  "/all",
  conditionalVerifyAccess,
  commentController.getComments
);

commentRouter.put(
  "/update",
  verifyAccessToken,
  commentController.updateComment
);

commentRouter.delete(
  "/delete",
  verifyAccessToken,
  commentController.deleteComment
);

module.exports = commentRouter;
