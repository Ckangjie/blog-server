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
		let sql = 'select * from article order by readCount DESC limit ?,?',
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (result.length > 0) {
			return result
		}
	},
	// 文章数量
	getTotal: async function () {
		let sql = 'SELECT * FROM article',
			result = await query(sql)
		if (result.length > 0) {
			return result
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
	Delete: async function (id) {
		let sql = "DELETE FROM article WHERE id=?"
		result = await query(sql, id)
		if (result) {
			return true
		}
	},
	// 搜索文章
	search: async function (value) {
		var sql = ''
		if (value) {
			sql = "select * from article where title like '%" + value + "%' or content like '%" + value + "%'"
		} else {
			sql = 'select * from article'
		}
		let result = await query(sql, value).catch(function (res) {
			console.log(res)
		})
		return result
	},
	// 评论/留言
	addComment: async function (data) {
		let sql = data.length <= 2 ? 'UPDATE comment set info =? WHERE name=?' : 'insert into comment(name, email, article_id, path, content, website, reply_name,pid) values(?,?,?,?,?,?,?,?)',
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
	},
	// 留言列表
	commentList: async function (data) {
		let sql = data.length <= 2 ? 'select * from comment order by time asc' : 'select * from comment where path = ? order by time asc LIMIT ?,?',
			result = await query(sql, data).catch(err => {
				console.log(err)
			})
		if (result.length > 0) {
			return result
		} else {
			return []
		}
	},
	// 删除评论
	deleteComment: async function (id) {
		let sql = "DELETE FROM comment WHERE id=?"
		result = await query(sql, id)
		if (result) {
			return true
		}
	},
}