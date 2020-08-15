let common = require('../../data/common.js'),
    user = require('../../data/module/user'),
    jwt = require('jsonwebtoken'),
    url = require('url'),
    sendEmail = require('../../config/sendEmail'),
    formidable = require('formidable'),
    path = require('path'),
    md5 = require('MD5')

module.exports = {
    // async loginAdmin(req, res) {
    //     console.log(req)
    // },
    // 登录
    async login(req, res) {
        let username = req.body.username || req.query.username,
            password = req.body.password || req.query.password,
            client = req.body.client || req.query.client;
        if (client === 'admin') {
            let isUser = await user.login([username, password, client])
            if (isUser) {
                // 获取token
                // sign(加密数据,加密密钥,token存储时间) 加密用户名
                let token = jwt.sign({ username, username }, 'ckj', {
                    // token有效时间为15分钟
                    expiresIn: 60 * 2 * 1
                })
                res.json({
                    status: 200,
                    message: '登录成功',
                    type: 'success',
                    data: {
                        token,
                        id: isUser.id
                    }
                })
            }
            return false
        }
        // 判断邮箱格式
        if (!username) {
            res.json({
                status: 501,
                message: '邮箱格式错误'
            })
            return false
        }
        // 验证密码格式
        if (!password && common.isPwd(password)) {
            res.json({
                status: 504,
                message: '密码格式错误'
            })
        }

        // 数据库查找邮箱和密码
        let isUser = await user.login([username, md5(password), client])
        if (isUser) {
            // 获取token
            // sign(加密数据,加密密钥,token存储时间) 加密用户名
            let token = jwt.sign({ username, username }, 'ckj', {
                // token有效时间为15分钟
                expiresIn: 60 * 2 * 1
            })
            res.json({
                status: 200,
                message: '登录成功',
                type: 'success',
                pagecount: 0,
                data: {
                    token,
                    id: isUser.id
                }
            })
        }
        else {
            res.json({
                status: 511,
                message: '用户名或者密码不正确',
            })
        }

    },
    async userInfo(req, res) {
        var token = req.headers.token,
            id = req.headers.userid;
        let result = await user.userInfo(Number(id))
        if (result) {
            res.json({
                status: 200,
                data: result
            })
        } else {
            res.json({
                status: 208,
                message: 'token失效',

            })
        }

    },
    // 获取验证码
    async getCode(req, res) {
        var params = req.body,
            email = params.username;
        sendEmail.sendEmail(email).then(code => {
            res.json({
                status: 200,
                code,
                message: '发送成功',
                type: 'success'

            })
        })
    },
    // 注册
    async register(req, res) {
        var params = req.body,
            email = params.username,
            password = params.password,
            code = params.code;
        // 判断验证码是否正确
        let isCode = await user.verifyCode([email, code])
        if (!isCode) {
            res.json({
                status: 201,
                message: '验证码错误',
            })
            return false
        }
        // 判断邮箱是否被注册
        let isRegister = await user.isRegister(email)
        if (!isRegister) {
            res.json({
                status: 202,
                message: '邮箱已被注册',
            })
            return false
        }
        // 注册
        let register = await user.register([email, md5(password)])
        if (register) {
            res.json({
                status: 200,
                message: '注册成功',
                type: 'success'
            })
        }
    },
    // 退出登录
    async logout(req, res) {
        res.json({
            status: 200
        })
    },
    // 上传头像
    async uploadAvatar(req, res) {
        let form = new formidable.IncomingForm();
        // 保留文件后缀名
        form.keepExtensions = true
        // 存储位置
        form.uploadDir = './static/user'
        form.parse(req, function (err, fields, files) {
            let url = path.basename(files.file.path)
            let name = path.basename(files.file.name)
            if (url) {
                res.json({
                    status: 200,
                    data: {
                        url,
                        name
                    }
                })
            }
        })
    },
    // 保存用户名
    async saveInfo(req, res) {
        let params = req.body,
            username = params.username,
            avatar = params.avatar,
            oldAvatar = params.oldAvatar,
            id = req.headers.userid;
        if (avatar) {
            if (avatar !== oldAvatar) {
                common.getJsonFiles("static/user", oldAvatar)
            }
            result = await user.saveInfo([username, avatar, Number(id)])
            if (result) {
                res.json({
                    status: 200,
                    message: '修改成功',
                    type: 'success'
                })
            }
        } else {
            res.json({
                status: 201,
                message: '请选择图片',
            })
        }
    }
}