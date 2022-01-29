
const redis = require('redis');

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: '6379',
});

redisClient.on('connection', () => { 
  console.info('Redis connected!');
});

redisClient.on('error', err => {
  console.log('Error ' + err);
});

module.exports = redisClient


// "ready" : redis server와 연결이 확정되고 client가 준비 상태가 되었을 때 이벤트가 발생합니다. redis의 명령어들은 ready event가 발생하기 전에 실행되어야 합니다.
// "connect" : redis server와 connection을 맺었을 때 이벤트가 발생합니다.
// "reconnecting" : redis server와 연결이 끊긴 후에 다시 connection을 맺었을 때 이벤트가 발생합니다.
// "error" : redis server와의 연결에서 오류가 발생했을 때 이벤트가 발생합니다.
// "end" : redis server와의 connection이 close 되었을 때 이벤트가 발생합니다.
// "warning" : deprecate 된 option 이나 function을 사용했을 때 이벤트가 발생합니다.