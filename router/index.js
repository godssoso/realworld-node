const express = require("express");

const router = express.Router();

//用户相关路由
router.use(require("./user"));

//文章相关路由
router.use(require("./article"));

module.exports = router;
