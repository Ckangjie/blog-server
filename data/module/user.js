let query = require('../mysql.js')
module.exports = {
	// 验证用户是否注册
	isRegister: async function (value) {
		let sql = value.indexOf('@qq.com') ? 'SELECT * FROM user WHERE name = ?' : 'SELECT * FROM admin WHERE password = ?',
			result = await query(sql, value)
		if (result.length > 0) {
			// 注册
			return false
		} else {
			// 未注册
			return true
		}
	},
	// 注册
	register: async function (data) {
		let flag = true
		let sql = data[0].indexOf('@qq.com') > 0 ? 'insert into user(name,password) values(?,?)' : 'insert into admin(username,password) values(?,?)',
			result = await query(sql, data).catch(function (res) {
				flag = false
				return flag
			}).then(res => {
				flag = true
				return flag
			})
		return flag
	},
	// 验证登录信息
	login: async function (data) {
		let sql = data.includes('client') ? 'select * from user where name =? and password = ?' : 'select * from admin where username =? and password = ?',
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (result.length > 0) {
			return result[0]
		}
		return false
	},
	// 存储验证码
	saveCode: async function (data) {
		let sql = 'insert into verfiy(code,email) values(?,?)',
			result = await query(sql, data)
		return true
	},
	// 验证验证码
	verifyCode: async function (data) {
		let sql = 'select * from verfiy where email =? and code=? order by time asc',
			result = await query(sql, data)
		if (result.length > 0) {
			return result
		}
		return false
	},
	// 上传头像
	saveInfo: async function (data) {
		let sql = 'UPDATE user set username =?,avatar=? WHERE id=?',
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (result) {
			return true
		}
	},
	//用户信息
	userInfo: async function (id) {
		let sql = ['admin', 'test'].includes(id) ? 'select * from admin where username=?' : 'select * from user where id=?',
			result = await query(sql, id)
		if (result.length > 0) {
			return result[0]
		}
	},

	// 获取商家数据
	getShop: async function () {
		var sql = "SELECT b.user_id, SUBSTRING(a.shopname,LOCATE('】',a.shopname)+1) shopname,a.title,a.description,a.indexpic,a.`status`,a.price,a.stocks,a.images,a.categoryname,a.unit,b.name FROM dlysc_commoditity a LEFT JOIN db_shop b on SUBSTRING(a.shopname,LOCATE('】',a.shopname)+1)=b.name", flag = false,
			result = await query(sql)
		if (result.length > 0) {
			return result
		} else {
			return false
		}

	},
	// 批量插入
	addUserData: async function (data) {
		var user = false
		let sql = 'insert into db_user(phone,nickname,photo,details,name,sex,birthday,identity,identity_photo,address,register_date,status) values ?',
			// let sql = 'select * from db_user';
			result = await query(sql, [data]).catch(err => {
				console.log(err)
			}).then(res => {
				user = true
			})
		if (user) {
			return user
		} else {
			return false
		}
	}
}
