// const { createClient } = require('redis');

// const client = createClient({
//     password: 'boOB1dNRLK8L4jt8KFw4i4ziwLCDrr84',
//     socket: {
//         host: 'redis-13134.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
//         port: 13134
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// async function redisConnect() {
//     try {
//         await client.connect();

//         await client.set('key', '1234');
//         const value = await client.get('key');

//         console.log("value>>>>", value)
//         await client.disconnect();
//     } catch (err) {
//         console.log(err)
//     }
// }

// redisConnect()

const Redis = require('ioredis');
const redis = new Redis("redis://default:boOB1dNRLK8L4jt8KFw4i4ziwLCDrr84@redis-13134.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:13134");

module.exports = redis
// redis.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

// // ioredis supports the node.js callback style
// redis.get("mykey", (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result); // Prints "value"
//   }
// });

// // Or ioredis returns a promise if the last argument isn't a function
// redis.get("mykey").then((result) => {
//   console.log(result); // Prints "value"
// });