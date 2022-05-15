const { verify } = require("../util/jwt");
const { jwtSignature } = require("../config/base.config");
const { User } = require("../model");

module.exports = async (req, res, next) => {
  //从请求头中获取token
  let token = req.headers["x-token"];
  token = token ? token.split("token ")[1] : null;
  //判断token是否存在  不存在则返回报错
  if (!token) {
    return res.status(401).send("未接收到token");
  }
  //存在则继续认证token
  try {
    const decodeToken = await verify(token, jwtSignature);
    // console.log(decodeToken);
    //拿 解析出的token中的userId 去数据库中查找用户
    let user = await User.findById(decodeToken.userId);
    if (!user) {
      return res.status(401).send("token认证失败");
    }
    // console.log(user);
    //将查询出的用户挂载到req对象上  然后调用下一个中间件
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send("token认证失败");
  }
};
