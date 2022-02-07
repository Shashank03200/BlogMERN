const postRouter = require("express").Router();
const postController = require("../controllers/post.controller");
const { verifyAccessToken } = require("../helpers/auth_jwt");
const multer_upload = require("../helpers/multer_upload");

postRouter.get("/:postId", verifyAccessToken, postController.getPost);

postRouter.delete("/:postId", verifyAccessToken, postController.deletePost);

postRouter.post(
  "/newpost",
  verifyAccessToken,
  multer_upload.single("postImage"),
  postController.createPost
);

postRouter.put(
  "/editpost/:postId",
  verifyAccessToken,
  multer_upload.single("postImage"),
  postController.editPost
);

module.exports = postRouter;
