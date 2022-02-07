const {
  verifyAccessToken,
  conditionalVerifyAccess,
} = require("../helpers/auth_jwt");

const userController = require("../controllers/user.contoller");
const upload = require("../helpers/multer_upload");
const userRouter = require("express").Router();

userRouter.get(
  "/allposts/:userId",
  verifyAccessToken,
  userController.getAllPosts
);

userRouter.get("/user", verifyAccessToken, userController.getCurrentUser);

userRouter.get(
  "/user/:userId",
  conditionalVerifyAccess,
  userController.getUser
);

userRouter.put(
  "/edit-user/:userId",
  verifyAccessToken,
  upload.single("profilePicture"),
  userController.editUser
);

userRouter.put("/edit-pref", verifyAccessToken, userController.setPreferences);

userRouter.delete(
  "/delete/:userId",
  verifyAccessToken,
  userController.deleteUser
);

module.exports = userRouter;
