const { User } = require("../model");
const { sign } = require("../util/jwt");
const { jwtSignature } = require("../config/base.config");

//用户登录
exports.login = async (req, res, next) => {
  try {
    //用户登录时  通过数据验证后，要生成toke返回客户端  采用jwt身份认证
    const token = await sign({ userId: req.user._id }, jwtSignature, {
      expiresIn: 60 * 60 * 24, //设置token过期时间 为一天
    });
    let user = req.user.toJSON();
    user.token = token;
    res.status(200).json({
      message: "登陆成功",
      user,
    });
  } catch (error) {
    next(error);
  }
};

//用户注册
exports.register = async (req, res, next) => {
  try {
    //数据验证
    console.log(req.body);

    //数据验证通过
    let user = new User(req.body.user);

    //保存到数据库
    await user.save();

    //通过以下两步  可在 new创建用户后返回时移除密码字段
    // user = user.toJSON(); // mongoose 提供的方法：将 mongo架构的数据转为json

    // delete user.password;

    //发送响应
    res.status(202).json({
      message: "添加成功",
      user,
    });
  } catch (error) {
    next(error);
  }
};

//获取当前用户
exports.currentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};
