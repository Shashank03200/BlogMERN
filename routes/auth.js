const authRouter = require("express").Router();
const authController = require("../controllers/auth.controller");
const {
  loginValidationRules,
  registerValidationRules,
  validate,
} = require("../helpers/validate_credentials");

authRouter.post(
  "/register",
  registerValidationRules(),
  validate,
  authController.register
);

authRouter.post(
  "/login",
  loginValidationRules(),
  validate,
  authController.login
);

authRouter.post("/refresh-token", authController.refreshToken);

authRouter.post("/logout", authController.logout);

module.exports = authRouter;
