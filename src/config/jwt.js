const randToken = require("rand-token");
const jwt = require("jsonwebtoken");
const secretKey = require("./secretKey").secretKey;
const options = require("./secretKey").options;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  sign: (user) => {
    const payload = {
      id: user.id,
      password: user.password,
    };
    const result = {
      token: jwt.sign(payload, secretKey, options),
      refreshToken: randToken.uid(256),
    };
    return result;
  },
  verify: (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === "jwt expired") {
        return TOKEN_EXPIRED;
      } else if (err.message === "invalid token") {
        return TOKEN_INVALID;
      } else {
        return TOKEN_INVALID;
      }
    }
    return decoded;
  },
};
