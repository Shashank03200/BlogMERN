const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("./redis_init");

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_SECRET;
    const options = {
      expiresIn: "1y",
      audience: userId,
      issuer: "blogbyshashank.com",
    };
    jwt.sign(payload, secret, options, (err, accessToken) => {
      if (err) {
        console.log(err.message);
        return reject(createError.InternalServerError());
      }
      resolve(accessToken);
    });
  });
};

const verifyAcessToken = (req, res, next) => {
  try {
    const accessString = req.headers["authorization"];
    if (!accessString) {
      throw createError.Unauthorized();
    }
    const bearerToken = accessString.split(" ");
    const accessToken = bearerToken[1];

    if (!accessToken) {
      throw createError.Unauthorized();
    }

    jwt.verify(
      accessToken,
      process.env.ACCESS_SECRET,

      function (err, result) {
        if (err) {
          throw createError.Unauthorized("Invalid access token");
        }
        req.userId = result.aud;
        next();
      }
    );
  } catch (err) {
    next(err);
  }
};

const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_SECRET;
    const options = {
      issuer: "blogbyshashank.com",
      audience: userId,
      expiresIn: "1y",
    };

    jwt.sign(payload, secret, options, (err, refreshToken) => {
      if (err) {
        return reject(createError.InternalServerError());
      }
      client.set(
        userId,
        refreshToken,
        "EX",
        365 * 24 * 60 * 60,
        (err, result) => {
          if (err) {
            return reject("Data Store Error");
          }
          console.log(result);
          return resolve(refreshToken);
        }
      );
    });
  });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,

        function (err, result) {
          if (err) {
            throw createError.Unauthorized("Invalid refresh token");
          }
          console.log("Verify Refresh Token", result);
          const userId = result.aud;
          client.get(userId, (err, storedRefreshToken) => {
            if (err) {
              throw createError.InternalServerError();
            }
            if (refreshToken !== storedRefreshToken) {
              throw createError.Unauthorized();
            }
            return resolve(true);
          });
        }
      );
    } catch (err) {
      next(err);
    }
  });
};

module.exports = {
  signAccessToken,
  verifyAcessToken,
  signRefreshToken,
  verifyRefreshToken,
};
