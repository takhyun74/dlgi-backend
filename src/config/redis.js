
const redis = require('redis');

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: '6379',
});

redisClient.on('connection', () => { 
  console.info('Redis connected!');
});

redisClient.on('error', err => {
  console.log("test");
  console.log('Error ' + err);
});

module.exports = redisClient
