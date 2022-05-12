const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errHandler = require("./middleware/errorHandler");
const router = require("./router");

require("./model"); //连接数据库

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 3000;

//挂载路由
app.use("/api", router);

//匹配404
app.use((req, res) => {
  res.status(404).send("404 Not Fund");
});

//配置统一错误处理函数
app.use(errHandler());

app.listen(PORT, () => {
  console.log(`Serve running at http://localhost:${PORT}`);
});
