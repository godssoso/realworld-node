const { User } = require("../model");

//用户登录
exports.login = async (req, res, next) => {
  try {
    res.status(200).send("/login post");
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
