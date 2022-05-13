/**
 * 用户模块的数据验证规则
 */
const vaildate = require("../middleware/vaildate");
const { body } = require("express-validator");
const { User } = require("../model"); //导入用户数据模型
const md5 = require("../util/md5");

//用户注册
exports.register = vaildate([
  // 1.参数校验  使用express-validator库帮助校验
  body("user.password").notEmpty().withMessage("密码不能为空"),
  body("user.userName")
    .notEmpty()
    .withMessage("用户名不能为空")
    .custom(async (userName) => {
      //自定义校验
      const user = await User.findOne({ userName }); // 通过 findOne方法 查找数据库中有没有相同用户名的
      if (user) {
        return Promise.reject("用户名已存在"); //通过 Promise.reject 方法返回异常提示错误
      }
    }),
  body("user.email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确")
    .bail() //bail方法表示 如果前面验证失败 则不会往下继续校验  前面验证都通过才会继续往下
    .custom(async (email) => {
      //自定义校验
      const user = await User.findOne({ email }); // 通过 findOne方法 查找数据库中有没有相同邮箱的
      if (user) {
        return Promise.reject("邮箱已存在"); //通过 Promise.reject 方法返回异常提示错误
      }
    }),
]);

//用户登录
// 不同于注册的数据验证，由于此处采用的 vailddate验证方法是并行验证，会将所有验证规则都校验一遍
// 而登录的验证逻辑是：先 校验邮箱和密码不能为空，再 校验所填邮箱是否存在，最后 比对输入的密码是否跟数据库中的密码相同
// 所以这里采用导出数组的方式，利用express中间件的特性，可以插入多个中间件依次执行，分步骤校验
exports.login = [
  vaildate([
    body("user.email").notEmpty().withMessage("邮箱不能为空"),
    body("user.password").notEmpty().withMessage("密码不能为空"),
  ]),
  vaildate([
    body("user.email").custom(async (email, { req }) => {
      const user = await User.findOne({ email }).select([
        "userName",
        "password",
        "bio",
        "email",
        "image",
      ]);
      if (!user) {
        return Promise.reject("邮箱不存在");
      }
      //   console.log(user);
      req.user = user; //  所有中间件共享一个 req对象，此处将所查询出的user挂载到req对象上，下一步就不需要再去查询数据库比对了
    }),
  ]),
  vaildate([
    body("user.password").custom(async (password, { req }) => {
      //   console.log(password);
      if (md5(password) !== req.user.password) {
        return Promise.reject("密码错误");
      }
    }),
  ]),
];
