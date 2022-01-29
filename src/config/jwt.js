const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const redisClient = require('./redis.js');

const { secretKey, accessTokenOption, refreshTokenOption } = require("./secretKey");

module.exports = {
  sign: (user) => {
    const payload = {
      user_id: user.user_id,
      authority: user.code_auth,
    };
    
    return jwt.sign(payload, secretKey, accessTokenOption);
  },
  verify: (token) => {
    let decoded = null;
    try {
      decoded = jwt.verify(token, secretKey);

      return {
        ok: true,
        id: decoded.user_id,
        authority: decoded.authority,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  refresh: () => {
    return jwt.sign({}, secretKey, refreshTokenOption);
  },
  refreshVerify: async (token, userId) => {
    const getAsync = promisify(redisClient.get).bind(redisClient);
    try {
      const data = await getAsync(userId);

      if (token === data) {
        try {
          jwt.verify(token, secretKey);
          return true;
        } catch (err) {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
};
