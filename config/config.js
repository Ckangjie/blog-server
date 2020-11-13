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
    // mysql: {
    //     host: '120.79.186.106',
    //     port: '3308',
    //     user: 'root',
    //     password: 'EAJYhnP8MTX54k2r',
    //     database: 'blog'
    // },
    mysql: {
        host: '127.0.0.1',
        port: '3307',
        user: 'root',
        password: '123456',
        database: 'blog'
    },
    // mysql: {
    //     host: '49.232.174.102',
    //     port: '3306',
    //     user: 'api_zgdljsw_com',
    //     password: 'ZMmjf65Ra8PkhCi8',
    //     database: 'api_zgdljsw_com'
    // },
}