
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

      console.log("authToken : " + authToken);
      console.log("refreshToken : " + refreshToken);

      const authResult = verify(authToken);
      const decoded = jwt.decode(authToken);
      
      console.log(authResult);
      
      if (decoded === null) {
        res.status(401).send({
          ok: false,
          message: 'No authorized!',
        });
      }

      const refreshResult = refreshVerify(refreshToken, decoded.user_id);
      console.log(refreshResult);

      console.log(authResult.ok);
      console.log(authResult.message);

      if (authResult.ok === false && authResult.message === 'jwt expired') {
        console.log("11");
        // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
        if (refreshResult.ok === false) {
          console.log("22");
          res.status(401).send({
            ok: false,
            message: 'No authorized!',
          });
        } else {
          console.log("33");
          // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
          const newAccessToken = sign(user);

          res.status(200).send({ // 새로 발급한 access token과 원래 있던 refresh token 모두 클라이언트에게 반환합니다.
            ok: true,
            data: {
              accessToken: newAccessToken,
              refreshToken,
            },
          });
        }
      } else {
        console.log("44");
        // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
        res.status(500).send({
          ok: false,
          message: 'Acess token is not expired!',
        });
      }
    } else { // access token 또는 refresh token이 헤더에 없는 경우
      console.log("55");
      res.status(400).send({
        ok: false,
        message: 'Access token and refresh token are need for refresh!',
      });
    }
  });
}
