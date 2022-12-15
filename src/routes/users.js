const router = require("koa-router")();
const user = require("../controller/user");

router.prefix("/users");

router.post("/register", async (ctx, next) => {
  const userInfo = ctx.request.body;
  const statement = `INSERT INTO users (id, username, password, nickname, email, brithday, logos) VALUES("0", "${userInfo.username}", "${userInfo.password}", "${userInfo.nickname}", "${userInfo.email}", "${userInfo.brithday}", "sss")`
  let result = await new Promise((resolve, reject) => {
    return user.query(statement, (err, data) => {
      if(err) throw err;
      let obj = {
        msg: "成功插入一条数据",
        data: data
      }
      resolve(obj);
    });
  });
  ctx.body = result;
});

module.exports = router;
