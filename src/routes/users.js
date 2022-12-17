const router = require("koa-router")();
const { register, login } = require("../controller/user");
const CheckLogin = require("../check/CheckLogin");

router.prefix("/users");

// 注册接口
router.post("/register", async (ctx, next) => {
  const userInfo = ctx.request.body;
  // 检查是否有用户名及密码
  if (userInfo.username == "" || userInfo.password == "") {
    ctx.body = {
      errno: 2,
      message: "请输入用户名或者密码",
    };
    return;
  }
  try {
    let newUser = await register(userInfo);
    ctx.body = newUser;
  } catch (e) {
    ctx.body = e;
  }
});

// 登录接口
router.post("/login", async (ctx, next) => {
  const userInfo = ctx.request.body;
  try {
    let loginUser = await login(userInfo);
    if (loginUser.errno === 0) {
      // 设置session
      ctx.session.userInfo = {
        userid: loginUser.id,
        username: loginUser.username,
      };
    }
    ctx.body = loginUser;
  } catch (e) {
    ctx.body = e;
  }
});

// 检查登录状态
router.get("/getUserInfo", CheckLogin, async (ctx, next) => {
  ctx.body = {
    errno: 0,
    data: ctx.session.userInfo,
  };
});

module.exports = router;
