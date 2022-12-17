async function CheckLogin(ctx, next) {
  const session = ctx.session || {};
  const userInfo = session.userInfo;
  if (userInfo && userInfo.userid) {
    // 进来的都是登录过得
    await next();
  } else {
    ctx.body = {
      errno: 1,
      message: "用户没有登录",
    };
  }
}
module.exports = CheckLogin;
