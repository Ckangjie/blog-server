let jwt = require('./jwt');
module.exports = {
    async validate(req, res, next) {
        // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
        if (req.url != '/login' && req.url != '/register') {
            let token = req.headers.token;
            if (token) {
                let result = jwt.verifyToken(token);
                // 如果考验通过就next，否则就返回登陆信息不正确
                if (result == 'err') {
                    res.json({ status: 403, message: '登录已过期,请重新登录', type: 'warning' });
                } else {
                    next();
                }
            } else {
                next()
            }
        } else {
            next();
        }
    }
}