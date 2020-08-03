// 接口汇总
let article = require('./module/article.js'),
    user = require('./module/user.js'),
    msg = require('./module/msg.js'),
    sendEmail = require('../config/sendEmail'),
    // assign 合并对象
    obj = Object.assign({}, article, user, msg, sendEmail);

module.exports = obj