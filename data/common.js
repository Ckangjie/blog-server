let jwt = require('jsonwebtoken')
let fs = require('fs')
let path = require('path')
let join = require('path').join
let url = require('url')
let formidable = require('formidable')
module.exports = {
	// 验证邮箱
	isEmail(email) {
		if (!email) return false
		let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
		return reg.test(email)
	},
	// 密码验证
	isPwd(pwd) {
		if (!pwd) return false
		let reg = /^[a-zA-Z][A-Za-z0-9_-]{5,18}$/
		return reg.test(pwd)
	},
	verifyToken(token) {
		// 验证token
		let userToken = jwt.verify(token, 'ckj', function (err, result) {
			if (err) {
				console.log("token已过期")
				return false
			} else {
				// console.log("token未过期")
				return true
			}
		})
		return userToken
	},
	// 从文件夹删除相应图片
	getJsonFiles(jsonPath, img) {
		var index = img.lastIndexOf("\/");
		img = img.substring(index + 1, img.length);
		let jsonFiles = [];
		function findJsonFile(path) {
			let files = fs.readdirSync(path);
			files.forEach(function (item, index) {
				let fPath = join(path, item);
				let stat = fs.statSync(fPath);
				if (stat.isDirectory() === true) {
					findJsonFile(fPath);
				}
				if (stat.isFile() === true) {
					fs.unlink(jsonPath + '/' + img, (err) => {
						if (err) {
							// console.log('已删除图片:' + img)
						}
					})
					jsonFiles.push(fPath);
				}
			});
		}
		findJsonFile(jsonPath);
	},
	img(req, res) {
		let form = new formidable.IncomingForm();
		// 保留文件后缀名
		form.keepExtensions = true
		// 存储位置
		form.uploadDir = './static/article'
		form.parse(req, function (err, fields, files) {
			if (files.file) {
				var imagesUrl = path.basename(files.file.path)
			} else {
				var imagesUrl = path.basename(files.upload_file.path)
			}
			res.json({
				status: 200,
				data: imagesUrl
			})
		})
	}
}



