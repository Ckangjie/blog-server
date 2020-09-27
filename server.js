let express = require('express'),
	router = require('./router/router'),
	bodyParser = require('body-parser'),
	testData = require('./api/test.json'),
	userData = require('./api/user.json'),
	obj = {},
	data = Object.assign(obj, testData, userData),
	app = express(),
	jwt = require('./config/jwt'),
	urlencoded = bodyParser.urlencoded({
		extended: false
	})

// 接收数据大小
app.use(bodyParser.json({ limit: "2100000kb" }));
// 静态服务器
// 图片
app.use(express.static('./static/images'))
app.use(express.static('./static/article'))
app.use(express.static('./static/user'))
// 跨域
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
	res.header("Access-Control-Allow-Credentials", "true")
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept, X-Requested-With , userid, token');
	next()
})

// 验证token
app.use(function (req, res, next) {
	// 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
	if (req.url != '/login' && req.url != '/register') {
		let token = req.headers.token;
		if (token) {
			let result = jwt.verifyToken(token);
			// 如果考验通过就next，否则就返回登陆信息不正确
			if (result == 'err') {
				res.json({ status: 403, message: '登录已过期,请重新登录' });
			} else {
				next();
			}
		} else {
			next()
		}

	} else {
		next();
	}
});


// 后/前台登录
app.post('/login', urlencoded, router.login)

// app.post('/loginAdmin', urlencoded, router.loginAdmin)

// 退出登录
app.post('/logout', urlencoded, router.logout)
// 注册
app.post('/register', urlencoded, router.register)
// 获取用户信息
app.post('/userInfo', urlencoded, router.userInfo)
// 添加文章封面
app.post('/articleCover', router.articleCover)

// 客户端登录
// app.post('/user/login', urlencoded, router.userLogin)
// 添加文章图片
app.post('/ImgUpload', urlencoded, router.ImgUpload)
// 添加文章
app.post('/addArticle', urlencoded, router.addArticle)
// 文章列表
app.post('/article', urlencoded, router.article)
// 文章数量
app.get('/total', urlencoded, router.getTotal)
// 文章详情
app.post('/getDetails', urlencoded, router.getDetails)
// 文章阅读量
app.post('/readCount', urlencoded, router.readCount)
// 删除文章
app.post('/Delete', urlencoded, router.Delete)
// 文章搜索
app.get('/search', router.search)
// 文章状态
app.post('/articleStatus', urlencoded, router.articleStatus)
// 分页
app.post('/paging', urlencoded, router.paging)
// 发送验证码
app.post('/getCode', urlencoded, router.getCode);
// 上传头像
app.post('/uploadAvatar', urlencoded, router.uploadAvatar)
// 保存用户名,头像
app.post('/saveInfo', urlencoded, router.saveInfo)

// 留言
app.post('/comment', urlencoded, router.comment)
// 留言列表
app.get('/commentList', router.commentList)
// 删除留言
app.post('/deleteComment', urlencoded, router.deleteComment)


app.listen(3001)