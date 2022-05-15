const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//文章数据模型
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tagList: {
    type: [String],
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
  favoritesCount: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId, //通过存作者id映射到用户信息集合
    ref: "User",
    required: true,
  },
});

module.exports = articleSchema;
