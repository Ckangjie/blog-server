let query = require('../mysql.js')
module.exports = {
	// 添加文章
	addArticle: async function (data) {
		let sql = 'insert into article(author,content,title,skill) values(?,?,?,?)',
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (result) {
			return true
		}
	},
	//文章列表
	articleList: async function (data) {
		let sql = data.includes('admin') ? 'select * from article order by readCount DESC limit ?,?' : (data.length > 3 ? 'select * from article where status =0 and author=? order by readCount DESC LIMIT ?,?' : 'select * from article where status =0 order by readCount DESC LIMIT ?,?'),
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (result.length > 0) {
			return result
		} else {
			return false
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
	getDetails: async function (id) {
		let sql = 'SELECT * FROM article where id =?',
			result = await query(sql, id)
		if (result.length > 0) {
			return result
		}
	},
	// 文章阅读量
	readCount: async function (data) {
		let sql = 'UPDATE article SET readCount=? where id =?'
		result = await query(sql, data).catch(res => {
			console.log(res)
		})
		if (result) {
			return true
		}
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
			sql = "select * from article where (title like '%" + data[0] + "%' or content like '%" + data[0] + "%') and status =0 and author='" + data[2] + "'"
		} else if (data.indexOf('/archive') < 0) {
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
		let sql = 'insert into comment(name, email, article_id, path, content, website, reply_name,pid) values(?,?,?,?,?,?,?,?)',
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
	},
	// 留言列表
	commentList: async function (data) {
		let sql = data.length <= 2 ? 'select * from comment order by time asc LIMIT ?,?' : 'select a.id,a.pid,a.time, a.`name`,a.content,a.pid,a.article_id,a.reply_name,b.avatar,b.username from `comment` a LEFT JOIN `user` b on a.`name`=b.name where a.path = ? order by time desc LIMIT ?,?',
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
		let sql = 'UPDATE article SET status=?,reason=? where id =?',
			reslut = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (reslut) {
			return true
		}
	}
}