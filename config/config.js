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
        host: '127.0.0.1',
        port: '3307',
        user: 'root',
        password: '123456',
        database: 'blog'
    },
    WX: {
        appid: 'wxe164493d4091307e',
        secret: '511d4daaa58ab984d3ac1b02c4661a0a',
        grant_type: 'authorization_code'
    }

}