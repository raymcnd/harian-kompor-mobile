const Redis = require('ioredis');
const redis = new Redis("redis://default:boOB1dNRLK8L4jt8KFw4i4ziwLCDrr84@redis-13134.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:13134");

module.exports = redis