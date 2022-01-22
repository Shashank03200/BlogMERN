const { verifyAcessToken } = require("../helpers/auth_jwt");
const userControlller = require("../controllers/user.contoller");
const upload = require("../helpers/multer_upload");
const userRouter = require("express").Router();

userRouter.get(
  "/allposts/:userId",
  verifyAcessToken,
  userControlller.getAllPosts
);

userRouter.get("/user/:userId", verifyAcessToken, userControlller.getUser);

userRouter.put(
  "/edit/:userId",
  verifyAcessToken,
  upload,
  userControlller.editUser
);

userRouter.delete(
  "/delete/:userId",
  verifyAcessToken,
  userControlller.deleteUser
);

module.exports = userRouter;
