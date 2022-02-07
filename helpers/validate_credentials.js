const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const User = require("../models/User");

const registerValidationRules = () => {
  return [
    body("email")
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value) => {
        console.log(typeof value);
        return User.findOne({ email: value }).then((foundUser) => {
          if (foundUser) {
            return Promise.reject("Email is already registered.");
          }
        });
      }),
    body("username")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a username")
      .isLength({ min: 3 })
      .withMessage("The username should be atleast 3 characters long.")
      .custom((value) => {
        return User.findOne({ username: value }).then((foundUser) => {
          console.log("username", foundUser);
          if (foundUser) {
            return Promise.reject("Username is already in use");
          }
        });
      }),
    body("password")
      .isLength({ min: 5 })
      .withMessage("The password should be atleast 5 characters long"),
    body("confirmPassword", "Please confirm you passwords correctly.")
      .exists()
      .custom((value, { req }) => value === req.body.password)
      .isLength({ min: 5 }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  console.log(extractedErrors);
  let msg = "";
  console.log("First error", extractedErrors[0]);
  console.log("Key", Object.keys(extractedErrors[0]));
  msg = msg + Object.values(extractedErrors[0])[0];

  return res.status(400).json({
    success: false,
    msg,
  });
};

const loginValidationRules = () => {
  return [
    body("email")
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value) => {
        return User.findOne({ email: value }).then((foundUser) => {
          if (!foundUser) {
            return Promise.reject("The email is not registered");
          }
        });
      }),
    body("password")
      .exists()
      .isLength({ min: 5 })
      .withMessage("The password should be atleast 5 characters long"),
  ];
};

const addCommentValidationRules = () => {
  return [
    body("commentText").exists().withMessage("Please provide some text"),
    body("postId")
      .exists()
      .custom((value) => {
        return Post.findOne({ _id: value }).then((foundPost) => {
          if (!foundPost) {
            return Promise.reject("No such post. Bad request");
          }
        });
      }),
    body("userId")
      .exists()
      .custom((value) => {
        return User.findOne({ _id: value }).then((foundUser) => {
          if (!foundUser) {
            return Promise.reject("No such user. Bad request");
          }
        });
      }),
  ];
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  addCommentValidationRules,
  validate,
};
