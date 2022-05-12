const express = require("express");
const userControl = require("../controller/user");

const router = express.Router();

//用户登录
router.post("/login", userControl.login);

//用户注册
router.post("/register", userControl.register);

module.exports = router;
