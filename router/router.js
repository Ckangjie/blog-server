// 接口汇总
let article = require('./module/article.js'),
    user = require('./module/user.js'),
    sendEmail = require('../config/sendEmail'),
    // assign 合并对象
    obj = Object.assign({}, article, user, sendEmail);

module.exports = obj