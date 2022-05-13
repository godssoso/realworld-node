const express = require("express");
const userControl = require("../controller/user");
const userVaildator = require("../vaildator/user");

const router = express.Router();

//用户登录
router.post("/login", userVaildator.login, userControl.login);

//用户注册
router.post(
  "/register",
  userVaildator.register, // 数据验证
  userControl.register //3. 验证通过，继续执行具体逻辑
);

module.exports = router;
