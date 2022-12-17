const mysqls = require("../db/mysql");
const md5 = require("../md5/md5");

// 注册模块
let register = async (userInfo) => {
  // 检查是否已被注册命令
  const checksql = `SELECT * FROM users WHERE username = '${userInfo.username}'`;
  // 获取时间戳 md5 生成id值
  const timeId = await md5.MD5(userInfo.username, Date.now().toString());
  // 加密密码
  const passwords = await md5.MD5(userInfo.username, userInfo.password);
  // 插入数据命令
  const registersql = `INSERT INTO users (id, username, password, nickname, email, brithday, logos) VALUES("${timeId}", "${userInfo.username}", "${passwords}", "${userInfo.nickname}", "${userInfo.email}", "${userInfo.brithday}", "")`;
  return new Promise((resolve, reject) => {
    mysqls.getConnection((err, connection) => {
      connection.query(checksql, (err, result) => {
        if (result.length === 0) {
          connection.query(registersql, (err, result) => {
            if (err) throw err;
            connection.release();
            let registerMsg = {
              errno: 0,
              id: timeId,
              username: userInfo.username,
              message: "注册成功",
            };
            resolve(registerMsg);
          });
        } else {
          connection.release();
          let registerMsg = {
            errno: 1,
            message: "用户已注册",
          };
          reject(registerMsg);
        }
      });
    });
  });
};

// 登录模块
let login = async (userInfo) => {
  const passwords = await md5.MD5(userInfo.username, userInfo.password);
  // 登录检测命令
  const loginCheck = `SELECT * FROM users WHERE username = '${userInfo.username}'`;
  return new Promise((resolve, reject) => {
    mysqls.getConnection((err, connection) => {
      connection.query(loginCheck, (err, result) => {
        if(result.length == 0){
            reject({
                errno: 1,
                message: "账号或密码不正确"
            });
            return;
        }
        if (result[0].password == passwords) {
          resolve({
            errno: 0,
            username: result[0].username,
            id: result[0].id,
            message: "账号密码正确"
          });
        } else {
          reject({
            errno: 1,
            message: "账号或密码不正确"
          });
        }
        connection.release();
      });
    });
  });
};

module.exports = { register, login };
