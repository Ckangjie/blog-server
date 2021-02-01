var query = require('../mysql.js'), flag = false
module.exports = {
	// 添加文章
	addArticle: async function (data) {
		let sql = data.indexOf('admin' >= 0) ? 'insert into article(author,content,title,skill,category,htmlCon,status) values(?,?,?,?,?,?,0)' : 'insert into article(author,content,title,skill) values(?,?,?,?)',
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (result) {
			return true
		}
	},
	//文章列表
	articleList: async function (data) {
		let sql = data.includes('admin') ? 'select a.`status`,a.id,a.content,a.category,a.readCount,a.reason,a.time,a.title,b.username from `article` a LEFT JOIN `user` b on a.author=b.name order by time desc limit ?,?' : (data.length > 3 ? 'select * from article where status =0 and author=? order by readCount DESC LIMIT ?,?' : 'select  a.`status`,a.id,a.content,a.readCount,a.reason,a.time,a.title,a.skill,a.category,a.htmlCon,b.username from `article` a LEFT JOIN `user` b on a.author=b.name and status=0 order by readCount DESC LIMIT ?,?'),
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (result.length > 0) {
			return result
		} else {
			return []
		}
	},
	// 文章数量
	getTotal: async function (data) {
		let sql = data.includes('admin') ? 'SELECT * FROM article' : (data.length === 2 ? 'SELECT * FROM article where status=0 and author=?' : 'SELECT * FROM article where status=0'),
			result = await query(sql, data)
		if (result.length > 0) {
			return result
		} else {
			return reslut = []
		}
	},
	// 文章详情
	getDetails: async function (params) {
		let sql = 'SELECT * FROM article where id =?',
			result = await query(sql, params)
		if (result.length > 0) {
			return result
		}
		return []
	},
	// 文章阅读量
	readCount: async function (data) {
		var sql = 'UPDATE article SET readCount=? where id =?',
			result = await query(sql, data).catch(res => {
				console.log(res)
			}).then(res => {
				return true
			})
		return result
	},
	// 删除文章
	Delete: async function (ids) {
		let sql = "DELETE FROM article WHERE id in (" + ids + ")"
		result = await query(sql, ids)
		if (result) {
			return true
		}
	},
	// 搜索文章
	search: async function (data) {
		var sql = ''
		if (data.indexOf('/archive') > 0) {
			sql = data.length > 2 ? "select * from article where (title like '%" + data[0] + "%' or content like '%" + data[0] + "%') and status =0 and author='" + data[2] + "'" : "select * from article where (title like '%" + data[0] + "%' or content like '%" + data[0] + "%')"
		}
		else if (data.indexOf('/dashboard') > 0 || data.indexOf('admin') > 0) {
			sql = "select * from article where (title like '%" + data[0] + "%' or content like '%" + data[0] + "%')"
		}
		else {
			sql = 'select * from article status =0'
		}
		let result = await query(sql, [data]).catch(function (res) {
			console.log(res)
		})
		return result
	},
	// 评论/留言
	addComment: async function (data) {
		let sql = 'insert into comment(name, email, article_id, path, content, website, reply_name,pid,photo) values(?,?,?,?,?,?,?,?,?)',
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (typeof result === 'object') {
			return true
		} else {
			return false
		}
	},
	// 留言列表
	commentList: async function (data) {
		let sql = data.length <= 2 ? 'select a.id,a.pid,a.time, a.`name`,a.content,a.pid,a.article_id,a.reply_name,a.website,a.photo,b.avatar,b.username from `comment` a LEFT JOIN `user` b on a.`name`=b.name order by time desc LIMIT ?,?' : 'select a.id,a.pid,a.time, a.`name`,a.content,a.pid,a.article_id,a.reply_name,a.photo,b.avatar,b.username,a.website from `comment` a LEFT JOIN `user` b on a.`name`=b.name where a.article_id = ? order by time desc LIMIT ?,?',
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (result.length > 0) {
			return result
		} else {
			return []
		}
	},
	// 评论数量
	commentTotal: async function () {
		let sql = 'SELECT * FROM comment',
			result = await query(sql)
		if (result.length > 0) {
			return result
		} else {
			return result = []
		}
	},
	// 删除评论
	deleteComment: async function (ids) {
		let sql = "DELETE FROM comment WHERE id in (" + ids + ")"
		result = await query(sql, ids)
		if (result) {
			return true
		}
	},
	articleStatus: async function (data) {
		let sql = 'UPDATE article SET title=?,content=?,skill=?,category=?,htmlCon=? where id =?',
			reslut = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (reslut) {
			return true
		}
	},
	// 添加文章分类
	addCategory: async function (data) {
		let sql = "insert into category(name,parent_id) values (?,?)",
			flag = false,
			result = await query(sql, data).then(res => {
				flag = true
			}).catch(err => {
				console.log(err)
			})
		if (flag) {
			return flag
		}
		return false
	},
	// 获取文章分类
	getCategoryList: async function (params) {
		let sql = params === "all" ? 'SELECT * FROM category' : params === '0' ? 'SELECT * FROM category WHERE parent_id=?' : 'SELECT * FROM category WHERE name=?',
			result = await query(sql, params)
		if (result.length > 0) {
			return result
		} else {
			return false
		}
	},
	// 获取分类文章
	getCatArticle: async function (params) {
		var sql = "SELECT * from article WHERE category = ?",
			result = [];
		await query(sql, params).then(res => {
			result = res
		})
		if (result.length > 0) {
			return result
		}
		return []
	},
	// 点赞收藏 查询
	fabulousFind: async function (params) {
		let sql = 'SELECT * from collect WHERE article_id= ? and user_id=?',
			result = await query(sql, params)
		if (result.length > 0) {
			return result
		}
		return []
	},
	// 插入点赞收藏
	fabulouAdd: async function (params) {
		let sql = 'insert into collect(user_id,article_id,collect_count,fabulous_count) values(?)',
			result = await query(sql, [params]).then(res => {
				return true
			}).catch(err => {
				console.log(err)
			})
		return result
	},
	// 修改点赞收藏
	fabulouUp: async function (params) {
		let sql = 'UPDATE collect set collect_count=?,fabulous_count=? where article_id =?',
			result = await query(sql, params).then(res => {
				return true
			}).catch(err => {
				console.log(err)
			})
		return result
	},
	// 微信评论
	wxCommentInsert: async function (params) {
		let sql = "INSERT INTO wx_comment(name,content,article_id,avatar,reply_name) values (?)",
			result = await query(sql, [params]).then(res => {
				return true
			}).catch(err => {
				console.log(err)
			})
		return result
	},
	// 获取评论
	getWxComment: async function (params) {
		let sql = 'SELECT * from wx_comment WHERE wx_comment.article_id=?',
			result = await query(sql, params)
		if (result.length > 0) {
			return result
		}
		return []
	},
	// 获取收藏文章数据
	getCollect: async function (params) {
		let sql = 'SELECT * from article LEFT JOIN collect ON article.id=collect.article_id LEFT JOIN wx_user on wx_user.wx_name=collect.user_id WHERE collect.collect_count=1 and collect.user_id=?',
			result = await query(sql, params)
		if (result.length > 0) {
			return result
		}
		return []
	}
}