var nodemailer = require('nodemailer'),
    config = require('../config').email,
    transporter = nodemailer.createTransport(config),
    user = require('../data/module/user')

// 创建SMIP对象

// 发送邮件
module.exports = {
    async sendEmail(email) {
        var code = Math.round(Math.random() * 899999 + 100000),
            html = `<h1 style="color:red">${code}</h1>`,
            options = {
                from: '<1040822172@qq.com>',
                to: email,
                bcc: '密送',
                subject: '注册验证码',
                text: '注册验证码',
                html
            };
        return new Promise((resolve, reject) => {
            transporter.sendMail(options, function (err, res) {
                if (err) {
                    reject()
                } else {
                    // 存储验证码
                    let result = user.saveCode([code, email])
                    resolve(code)
                }
            })
        })
    }
}