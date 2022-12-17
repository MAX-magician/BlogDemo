// 引入mongoose
const mongoose = require("mongoose");
// 定义url和dbName
const url = "mongodb://192.168.5.21:27017";
const dbName = "blog_mongo";
// 数据库连接
mongoose.connect(`${url}/${dbName}`);
// 获取连接对象
const conn = mongoose.connection;
// 监听错误
conn.on("error", (err) => {
  console.error("mongodb 链接错误……");
});
conn.on("open",() => {
  console.log("mongodb 链接成功");
});
// 导出
module.exports = mongoose;