const IORedis = require("ioredis");

const redis =
  process.env.REDIS_URL
    ? new IORedis(process.env.REDIS_URL)
    : new IORedis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      });

module.exports = redis;