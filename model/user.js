const mongoose = require("mongoose");
const md5 = require("../util/md5");

//用户数据模型
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: (value) => md5(value), //在存入数据库时先通过md5加密再存储
    select: false, //设置为查询数据库时 不展示密码
  },
  email: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = userSchema;
