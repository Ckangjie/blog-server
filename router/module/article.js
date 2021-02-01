let common = require('../../data/common.js'),
	article = require('../../data/module/article.js'),
	url = require('url'),
	path = require('path'),
	formidable = require('formidable'),
	_this = this;

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
		let params = Object.keys(req.body).length > 0 ? req.body : url.parse(req.url, true).query, total, result, list = [params.client], data = [Number(params.currentPage), Number(params.pageSize), params.client];
		if (params.author != undefined) {
			data.unshift(params.author)
			list.unshift(params.author)
		}
		total = await article.getTotal(list)
		if (total.length > 0) {
			let result = await article.articleList(data)
			if (result) {
				res.json({
					status: 200,
					data: result,
					total
				})
			} else {
				res.json({
					status: 201,
					message: '暂无数据',
				})
			}
		} else {
			res.json({
				status: 200,
				message: '暂无数据',
				data: []
			})
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
		var params = Object.keys(req.body).length > 0 ? req.body : req.query, result = '';
		result = await article.getDetails([params.id])
		res.json({
			status: 200,
			data: result
		})
	},
	// 添加文章
	async addArticle(req, res) {
		let params = Object.keys(req.body).length === 0 ? req.query : req.body,
			data = [params.author, params.content, params.title, params.tags, params.category, params.htmlCon],
			result = await article.addArticle(data);
		if (result) {
			res.json({
				status: 200,
				message: '添加成功',
				type: 'success'
			})
		} else {
			res.json({
				status: 201,
				message: '添加失败',
				type: 'error'
			})
		}
	},
	// 文章阅读量
	async readCount(req, res) {
		let params = req.body || req.query,
			data = [params.count, params.id],
			result = await article.readCount(data);
		if (result) {
			res.json({
				status: 200
			})
		}
	},
	// 删除文章
	async Delete(req, res) {
		let params = req.query,
			ids = params.ids;
		result = await article.Delete(ids)
		if (result) {
			res.json({
				status: 200,
				message: '删除成功',
				type: 'success'
			})
		}
	},
	// 文章搜索
	async search(req, res) {
		let params = url.parse(req.url, true).query,
			key = params.value,
			path = params.path,
			name = params.name, data = [], client = params.client;
		if (params.client === 'admin') {
			data = [key, client]
		} else {
			if (params.name != undefined) {
				data = [key, path, name]
			} else {
				data = [key, path]
			}
		}
		result = await article.search(data);
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
		var data = [], params = req.query || req.body, article_id = params.article_id ? params.article_id : '';
		data = [params.name, params.email, article_id, params.path, params.content, params.website, params.reply_name, params.pid, params.photo]
		result = await article.addComment(data);
		if (result) {
			res.json({
				status: 200,
				message: '留言成功',
				type: 'success'
			})
		} else {
			res.json({
				status: 201,
				message: '留言失败',
				type: 'error'
			})
		}
	},
	// 评论列表
	async commentList(req, res) {
		let params = url.parse(req.url, true).query,
			data = !params.article_id ? [Number(params.currentPage), Number(params.pageSize)] : [params.article_id, Number(params.currentPage), Number(params.pageSize)], total, result;
		total = await article.commentTotal()
		if (total.length > 0) {
			result = await article.commentList(data);
			if (result) {
				res.json({
					data: result,
					status: 200,
					total: total.length
				})
			}
		} else {
			res.json({
				data: [],
				status: 200,
			})
		}
	},
	// 删除评论
	async deleteComment(req, res) {
		let params = req.query,
			ids = params.ids;
		result = await article.deleteComment(ids)
		if (result) {
			res.json({
				status: 200,
				message: '删除成功',
				type: 'success'
			})
		}
	},
	async articleStatus(req, res) {
		let params = req.query,
			result = await article.articleStatus([params.title, params.content, params.tags, params.category, params.htmlCon, Number(params.id)]);
		if (result) {
			res.json({
				message: '修改成功',
				type: 'success',
				status: 200
			})
		}
	},
	// 获取文章分类
	async getCategoryList(req, res) {
		const params = req.body, paramsList = [],
			result = await article.getCategoryList(params.id)
		if (result) {
			res.json({
				status: 200,
				data: result
			})
		}
	},
	// 添加文章类别
	async addCategory(req, res) {
		const params = req.body, paramsList = [];
		if (params.parent_id.length === 0) {
			params.parent_id = 0
		}
		const iSexistence = await article.getCategoryList(params.name);
		if (iSexistence.length > 0) {
			res.json({
				status: 201,
				message: '此分类已存在!',
				type: 'warning',
				data: {}
			})
			return false
		}
		const result = await article.addCategory([params.name, params.parent_id])
		if (result) {
			res.json({
				status: 200,
			})
		}

	},
	// 获取分类文章
	async getCatArticle(req, res) {
		let params = req.body.name;
		let result = await article.getCatArticle(params)
		if (result) {
			res.json({
				status: 200,
				data: result
			})
		}
	},
	// 点赞收藏
	async fabulous(req, res) {
		let result = await article.fabulousFind([req.body.id, req.body.name])
		if (result.length > 0) {
			result = await article.fabulouUp([req.body.s, req.body.z, req.body.id])
			if (result) {
				res.json({
					status: 200
				})
			}
		} else {
			result = await article.fabulouAdd([req.body.name, req.body.id, req.body.s, req.body.z])
			if (result) {
				res.json({
					status: 200
				})
			}
		}
	},
	// 获取点赞数据
	async getFabulous(req, res) {
		let result = await article.fabulousFind([req.body.id, req.body.name])
		if (result.length > 0) {
			res.json({
				status: 200,
				data: result
			})
		}
	},
	// 微信评论
	async wxComment(req, res) {
		let result = await article.wxCommentInsert([req.body.name, req.body.content, req.body.art_id, req.body.avatar, req.body.reply_name])
		if (result) {
			res.json({
				status: 200
			})
		}
	},
	// 获取微信评论
	async getWxComment(req, res) {
		let result = await article.getWxComment([req.body.id])
		if (result) {
			res.json({
				status: 200,
				data: result
			})
		}
	},
	// 获取收藏文章数据
	async getCollect(req, res) {
		let result = await article.getCollect([req.body.userName])
		if (result) {
			res.json({
				status: 200,
				data: result
			})
		}
	}
}