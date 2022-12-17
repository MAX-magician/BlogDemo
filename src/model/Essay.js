const mongoose = require('../db/mongodb');
const EssaySchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    content:{
        type:String,
        required: true,
    },
},{
    timestamps: true, // 自动维护时间戳
    versionKey: false, // 清除版本信息
});

// 定义模型
const Essay = mongoose.model("blog_essay", EssaySchema);

// 导出
module.exports = Essay;