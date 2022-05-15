const express = require("express");
const articleControl = require("../controller/article");
const articleVaildator = require("../vaildator/article");
const checkToken = require("../middleware/checkToken");

const router = express.Router();

//创建文章
router.post(
  "/add_article",
  checkToken, //token认证
  articleVaildator.addArticle, //数据验证
  articleControl.addArticle //逻辑处理
);

//获取文章信息(通过文章id)
router.get(
  "/article/:articleId",
  articleVaildator.getArticle, //验证文章id类型是否正确
  articleControl.getArticle
);

//获取文章列表(通过条件)
router.get("/query_articles", articleControl.queryArticles);

//更新某篇文章(通过文章id)
router.post(
  "/update_article/:articleId",
  checkToken, //验证权限
  articleVaildator.updateArticle, //对articleId进行逻辑验证
  articleControl.updateArticle //执行具体逻辑
);

//删除某篇文章(通过文章id)
router.post(
  "/delete_article/:articleId",
  checkToken,
  articleVaildator.deleteArticle,
  articleControl.deleteArticle
);

module.exports = router;
