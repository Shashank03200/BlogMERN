const createError = require("http-errors");
const User = require("../models/User");
const client = require("../helpers/redis_init");
const sendEmail = require("../helpers/sendgrid_init");
const crypto = require("crypto");

const {
  signAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
  signRefreshToken,
} = require("../helpers/auth_jwt");

const register = async (req, res, next) => {
  try {
    const newUser = await new User(req.body);

    const token = crypto.randomBytes(20).toString("hex");
    newUser.activeToken = token;
    newUser.activeExpires = Date.now() + 10 * 60 * 1000;
    const user = await newUser.save();

    const emailResult = await sendEmail(user.email, token);
    if (emailResult.success) {
      res.status(200).json(emailResult);
    } else {
      res.status(500).json(emailResult);
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Selecting email and password from database explicitly using select method
    const reqUser = await User.findOne({ email: email }).select({
      email: 1,
      password: 1,
    });
    console.log(reqUser);
    if (reqUser) {
      const isValid = await reqUser.isValidPassword(password);
      if (isValid) {
        const accessToken = await signAccessToken(reqUser.id);
        const refreshToken = await signRefreshToken(reqUser.id);
        console.log({ accessToken, refreshToken });
        return res.status(200).json({
          success: true,
          msg: "Logged In",
          data: { accessToken, refreshToken },
        });
      } else {
        return res.status(200).json({
          success: false,
          msg: "Incorrect Email/Password",
        });
      }
    } else {
      throw createError(404, "The user is not registerd");
    }
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);
    res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      throw createError.BadRequest();
    }

    const userId = await verifyRefreshToken(refreshToken);
    client.DEL(userId, (err, result) => {
      if (err) {
        console.log(err);
        throw createError.InternalServerError();
      }
      console.log(result);
      res.status(204).json({ success: true, msg: "Logged out" });
    });
  } catch (error) {
    next(error);
  }
};

const verifyAccount = async (req, res, next) => {
  const activeToken = req.params.token;
  console.log(activeToken);
  const foundUser = await User.findOne({
    activeToken,
    activeExpires: { $gt: Date.now() },
  });

  if (!foundUser) {
    return res.status(404).json({
      sucess: false,
      msg: "The activation link is invalid",
    });
  }
  if (foundUser) {
    foundUser.active = true;
    foundUser.activeExpires = "";
    await foundUser.save();
    const accessToken = await signAccessToken(foundUser.id);
    const refreshToken = await signRefreshToken(foundUser.id);
    res.status(200).json({
      success: true,
      msg: "Account created",
      data: {
        accessToken,
        refreshToken,
      },
    });
  }
};
module.exports = {
  register,
  login,
  logout,
  refreshToken,
  verifyAccount,
};
