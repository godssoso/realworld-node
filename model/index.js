const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/realworld");

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("MongoDB连接失败", error);
});

db.once("open", function () {
  console.log("MongoDB数据库连接成功");
});

//组织导出模型类
module.exports = {
  User: mongoose.model("User", require("./user")), //用户类
  Article: mongoose.model("Article", require("./article")), //文章类
};
