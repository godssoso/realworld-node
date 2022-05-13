/**
 * 统一错误处理中间件
 */

const { format } = require("util");

module.exports = () => {
  return (err, req, res, next) => {
    res.status(500).json({
      //   error: format(err),    err报错信息在error原型上，要想输出整个error  则要使用 util模块的format方法处理
      error: err.message,
    });
  };
};
