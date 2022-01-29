module.exports = {
  secretKey : 'MySeCrEtKeY920704',
  accessTokenOption : {
      algorithm : "HS256",
      //expiresIn: '1h',
      expiresIn : "30s",
      issuer : "thkim"
  },
  refreshTokenOption : {
    algorithm : "HS256",
    expiresIn: '1m',
    //expiresIn: '14d',
    issuer : "thkim"
  }
}