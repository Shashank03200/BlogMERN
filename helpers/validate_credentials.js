const { body, validationResult } = require("express-validator");
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
      .isLength({ min: 3 })
      .exists({ checkFalsy: true })
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
  return res.status(400).json({
    errors: extractedErrors,
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

module.exports = {
  registerValidationRules,
  loginValidationRules,
  validate,
};
