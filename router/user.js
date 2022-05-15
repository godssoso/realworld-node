const express = require("express");
const userControl = require("../controller/user");
const userVaildator = require("../vaildator/user");
const checkToken = require("../middleware/checkToken");

const router = express.Router();

//用户登录
router.post("/login", userVaildator.login, userControl.login);

//用户注册
router.post(
  "/register",
  userVaildator.register, // 数据验证
  userControl.register //3. 验证通过，继续执行具体逻辑
);

//获取当前用户
// 接收请求头中的token信息，并认证token
router.get("/current_user", checkToken, userControl.currentUser);

module.exports = router;
