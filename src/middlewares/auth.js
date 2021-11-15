const jwt = require("../config/jwt.js");
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
  checkToken: (req, res, next) => {
    var token = req.headers.token;

    if (!token) return res.status(400).json({ success: false, message: "Token is Not Exist." });
    
    const user = jwt.verify(token);
    if (user === TOKEN_EXPIRED)
      return res.status(419).json({ success: false, message: "Token is Expire." });
    if (user === TOKEN_INVALID)
      return res.status(401).json({ success: false, message: "Token is Invalid." });
    if (user.id === undefined)
      return res.status(401).json({ success: false, message: "Token is Invalid." });
    req.id = user.id;
    next();
  },
};

module.exports = authUtil;
