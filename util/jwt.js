const jwt = require("jsonwebtoken");
const { promisify } = require("util");
//promisify 方法可以将 有回调函数的方法转为一个 promiss

module.exports = {
  sign: promisify(jwt.sign), //生成token的方法
  verify: promisify(jwt.verify), //验证token的方法
};
