// 公共配置信息
module.exports = {
    email: {
        server: 'QQ',
        host: "smtp.qq.com",
        port: 465,
        secure: true, //安全发送
        auth: {
            user: '1040822172@qq.com',
            pass: 'hyfztrwopxqebdbf'
        }

    },
    mysql: {
        host: 'localhost',
        port: '3307',
        user: 'root',
        password: '123456',
        database: 'blog'
    },
}