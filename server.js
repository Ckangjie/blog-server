let express = require('express'),
	router = require('./router/router'),
	bodyParser = require('body-parser'),
	obj = {},
	app = express(),
	validate = require('./config/validate'),
	fs = require("fs"),
	https = require("https"),
	http = require("http"),
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

// https
const httpsOption = {
	key: fs.readFileSync("./config/https/secret.key", 'utf8'),
	cert: fs.readFileSync("./config/https/certificate.pem", 'utf8')
}

// 超时处理

// 跨域
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
	res.header("Access-Control-Allow-Credentials", "true")
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept, X-Requested-With, token');
	next()
})


// 验证token
app.use(validate.validate);

// 后/前台登录
app.post('/login', urlencoded, router.login)

// app.post('/loginAdmin', urlencoded, router.loginAdmin)

// 退出登录
app.post('/loginout', urlencoded, router.loginout)
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
// 添加文章分类
app.post('/addCategory', urlencoded, router.addCategory)
// 获取文章分类
app.post('/getCategoryList', urlencoded, router.getCategoryList)
// 获取分类下的文章
app.post("/getCatArticle", urlencoded, router.getCatArticle)
//app.post('/customer/update', urlencoded, router.test)
// 微信登录
app.post('/wxLogin', urlencoded, router.wxLogin)
// 点赞收藏
app.post('/fabulous', urlencoded, router.fabulous)
// 获取点赞数据
app.post("/getFabulous", urlencoded, router.getFabulous)
// 添加微信评论
app.post("/wxComment", urlencoded, router.wxComment)
// 获取微信评论
app.post("/getWxComment", urlencoded, router.getWxComment)
// 获取收藏文章数据
app.post('/getCollect', urlencoded, router.getCollect)
//后台微信用户列表
app.post("/getWxUser", urlencoded, router.getWxUser)

app.get('/test', function (req, res) {
	if (req.protocol === 'https') {
		res.status(200).send('Welcome https!');
	}
	else {
		res.status(200).send('Welcome http!');
	}
});
// 程序运行端口
var httpsServer = https.createServer(httpsOption, app);
var httpServer = http.createServer(app);
//https监听3000端口
// httpsServer.listen(8089);
//http监听3001端口
httpServer.listen(8089);
