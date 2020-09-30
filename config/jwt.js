// 引入模块依赖
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports = {
    //生成token
    generateToken(value) {
        let created = Math.floor(Date.now() / 1000);
        let token = jwt.sign({ value, exp: created + 60 * 30 }, 'ckj')
        return token;
    },
    // 校验token
    verifyToken(token) {
        let res;
        try {
            let result = jwt.verify(token, "ckj")
            let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result || {};
            }
        } catch (e) {
            res = 'err';
        }
        return res;
    },

}
