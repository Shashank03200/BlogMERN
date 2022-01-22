const postRouter = require("express").Router();
const postController = require("../controllers/post.controller");
const { verifyAcessToken } = require("../helpers/auth_jwt");
const multer_upload = require("../helpers/multer_upload");

postRouter.get("/:postId", verifyAcessToken, postController.getPost);

postRouter.delete("/:postId", verifyAcessToken, postController.deletePost);

postRouter.post(
  "/newpost",
  verifyAcessToken,
  multer_upload,
  postController.createPost
);

postRouter.put(
  "/editpost/:postId",
  verifyAcessToken,
  multer_upload,
  postController.editPost
);

module.exports = postRouter;
