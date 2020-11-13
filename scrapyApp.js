let express = require('express'),
    cheerio = require('cheerio'),
    request = require('request'),
    app = express();

app.get('/hello', (req, res) => {
    res.json({
        data: '你好'
    })
})


var server = app.listen(9527, () => {
    console.log('应用程序运行端口:' + server.address().port)
})