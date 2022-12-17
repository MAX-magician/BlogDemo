const Essay = require("../model/Essay");

async function essayUpdate(content, username){
    const newEssay = await Essay.create({
        content,
        username,
      });
      return newEssay;
}

module.exports = { essayUpdate };
