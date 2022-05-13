/**
 * 通过md5对密码进行加密
 */
const crypto = require("crypto"); //node原生模块：里面包含多种散列算法

module.exports = (str) => {
  return crypto
    .createHash("md5")
    .update(str) //此处也可 混入自定义的字符串 防止暴力破解md5
    .digest("hex"); //十进制方式
};
