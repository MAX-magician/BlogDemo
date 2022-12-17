const md5 = require("md5");

exports.MD5 = (val, solt) => {
  return new Promise((resolve, reject) => {
    const passSolt = md5(md5(val) + solt);
    resolve(passSolt);
  });
};
