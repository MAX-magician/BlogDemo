const router = require("koa-router")();
const CheckLogin = require("../check/CheckLogin");
const { essayUpdate } = require("../controller/essay");

router.prefix("/essay");

router.post("/update", CheckLogin, async (ctx, next) => {
  const content = ctx.request.body.content;
  const username = ctx.session.userInfo.username;
  const newEssay = await essayUpdate(content, username);
  try {
    ctx.body = {
      errno: 0,
      data: newEssay,
    };
  } catch (error) {
    console.log("创建文章失败", error);
    ctx.body = {
      errno: 1,
      message: "创建文章失败",
    };
  }
});

module.exports = router;
