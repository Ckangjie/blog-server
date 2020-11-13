let express = require('express'),
    router = require('./router/router'),
    bodyParser = require('body-parser'),
    testData = require('./api/test.json'),
    userData = require('./api/tableExport.json'),
    obj = {},
    data = Object.assign(obj, testData, userData),
    app = express(),
    user = [],
    jsonSql = require('json-sql')(),
    urlencoded = bodyParser.urlencoded({
        extended: false
    });

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

// 后/前台登录

// app.post('/getUser', urlencoded, router.addUserData)


app.post('/getShop', urlencoded, router.getShop)

app.listen(3002)