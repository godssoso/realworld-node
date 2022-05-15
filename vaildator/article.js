/**
 * 文章模块的数据验证规则
 */
const vaildate = require("../middleware/vaildate");
const { body, param } = require("express-validator");
const { Article } = require("../model");
const { Promise } = require("mongoose");

//创建文章
exports.addArticle = vaildate([
  body("article.title").notEmpty().withMessage("文章标题不能为空"),
  body("article.body").notEmpty().withMessage("文章内容不能为空"),
  body("article.description").notEmpty().withMessage("文章摘要不能为空"),
]);

//获取文章信息（通过文章Id）
exports.getArticle = vaildate([
  vaildate.isValidObjectId(["params"], "articleId"),
]);

//更新某篇文章
//1 校验客户端所传的文章id类型是否正确
//2 校验该id是否存在于数据库
//3 校验该用户是否有权限更改这篇文章
exports.updateArticle = [
  vaildate([vaildate.isValidObjectId(["params"], "articleId")]),
  async (req, res, next) => {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({
        message: "文章不存在",
      });
    }
    req.article = article;
    next();
  },
  (req, res, next) => {
    if (req.user._id.toString() !== req.article.author.toString()) {
      return res.status(403).json({
        message: "该用户没有操作该篇文章的权限",
      });
    }
    next();
  },
];

//删除某篇文章
exports.deleteArticle = exports.updateArticle;
