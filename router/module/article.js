let common = require('../../data/common.js'),
	article = require('../../data/module/article.js'),
	url = require('url'),
	path = require('path'),
	formidable = require('formidable');
const { table } = require('console');

module.exports = {
	// 文章封面
	async articleCover(req, res) {
		common.img(req, res)
	},
	// 文章图片
	async ImgUpload(req, res) {
		common.img(req, res)
	},
	// 文章列表
	async article(req, res) {
		let params = Object.keys(req.body).length > 0 ? req.body : url.parse(req.url, true).query,
			data = [Number(params.currentPage), Number(params.pageSize)], total, result;
		total = await article.getTotal()
		if (total.length > 0) {
			result = await article.articleList(data)
			if (result) {
				res.json({
					data: result,
					status: 200,
					total: total.length
				})
			}
		}
	},
	// 文章数量
	async getTotal(req, res) {
		let result = await article.getTotal()
		if (result) {
			res.json({
				data: result,
				status: 200,
			})
		}
	},
	// 文章详情
	async getDetails(req, res) {
		let params = Object.keys(req.body).length > 0 ? req.body : req.query,
			id = params.id,
			result = await article.getDetails(id);
		if (result) {
			res.json({
				data: result,
				status: 200,
			})
		}
	},
	// 添加文章
	async addArticle(req, res) {
		let params = req.body,
			data = [params.author, params.content, params.title, params.skill],
			result = await article.addArticle(data);
		if (result) {
			res.json({
				status: 200,
				message: '添加成功'
			})
		}
	},
	// 文章阅读量
	async readCount(req, res) {
		let params = req.body,
			data = [params.count, params.id],
			result = await article.readCount(data)
		if (result) {
			res.json({
				status: 200
			})
		}
	},
	// 删除文章
	async Delete(req, res) {
		let params = req.query,
			id = params.id;
		result = await article.Delete(id)
		if (result) {
			res.json({
				status: 200,
				message: '删除成功'
			})
		}
	},
	// 文章搜索
	async search(req, res) {
		let key = url.parse(req.url, true).query.value,
			result = await article.search(key)
		if (result) {
			res.json({
				status: 200,
				data: result
			})
		}
	},
	// 分页
	async paging(req, res) {
		let params = req.body,
			data = [params.currentPage - 1, params.pageSize],
			result = await article.paging(data)
		if (result) {
			res.json({
				data: result,
				status: 200,
			})
		}
	},
	// 评论流言
	async comment(req, res) {
		var data = [], params = req.body, article_id = params.article_id ? params.article_id : '';
		data = [params.name, params.email, article_id, params.path, params.content, params.website, params.reply_name, params.pid]
		result = article.addComment(data);
		if (result) {
			res.json({
				status: 200
			})
		}
	},
	// 评论列表
	async commentList(req, res) {
		let params = url.parse(req.url, true).query;
		data = !params.path ? [0] : [params.path, Number(params.currentPage), Number(params.pageSize)]
		result = await article.commentList(data);
		if (result) {
			res.json({
				data: result,
				status: 200,
			})
		}
	},
	// 删除评论
	async deleteComment(req, res) {
		let params = req.query,
			id = params.id;
		result = await article.deleteComment(id)
		if (result) {
			res.json({
				status: 200,
				message: '删除成功'
			})
		}
	},
}