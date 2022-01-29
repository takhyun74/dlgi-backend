
const db = require("../index.js");
const User = db.user;

const jwt = require('jsonwebtoken');
const {sign, refresh, verify, refreshVerify} = require("../config/jwt.js");
const redisClient = require('../config/redis.js');
const bcrypt = require('bcrypt')

module.exports = (app) => {
  app.post("/login", async (req, res) => {
    const { user_id, password } = req.body;
    if (!(user_id && password)) {
      res.status(500).send("All input is not required.");
    }
    
    User.findByPk(user_id)
    .then(async (user) => {
      if(user) {
        if(bcrypt.compareSync(password, user.password)) {
          const accessToken = sign(user);
          const refreshToken = refresh();
          
          redisClient.set(user.user_id, refreshToken);
          
          res.status(200).send({ ok: true, message: "login success", accessToken, refreshToken });
        } else {
          res.status(500).send({ ok: false, message: "Password do not match." });
        }
      } else {
        res.status(500).send({ ok: false, message: "Error retrieving User with user_id=" + user_id });
      }
    })
    .catch((err) => { res.status(500).send({ ok: false, message: err.message }) }); 
  });

  app.get("/refresh", async (req, res) => {
    if (req.headers.authorization && req.headers.refresh) {
      const authToken = req.headers.authorization.split('Bearer ')[1];
      const refreshToken = req.headers.refresh;
      
      const authResult = verify(authToken);
      const decoded = jwt.decode(authToken);
      
      if (decoded === null) {
        res.status(401).send({ ok: false, message: 'No Authorized!' });
      }

      const refreshResult = await refreshVerify(refreshToken, decoded.user_id);
     
      if (authResult.ok === false && authResult.message === 'jwt expired') {
        if (refreshResult.ok === false) { // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
          res.status(401).send({ ok: false, message: 'No Authorized. Try login again!' });
        } else { // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
          User.findByPk(decoded.user_id)
          .then((data) => { 
            const newAccessToken = sign(data);
            res.status(200).send({ ok: true, message: 'accessToken was refreshed!', newAccessToken, refreshToken });
          })
          .catch((err) => { res.status(500).send({ message: err.message || "Error retrieving User with id=" + id }); });
        }
      } else { // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
        res.status(200).send({ ok: true, message: 'AcessToken is not expired!' });
      }
    } else { // 4. access token 또는 refresh token이 헤더에 없는 경우
      res.status(400).send({ ok: false, message: 'AccessToken and refreshToken are need for refresh!' });
    }
  });
}
