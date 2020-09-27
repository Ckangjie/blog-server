const { table } = require('console');
let common = require('../../data/common.js'),
	article = require('../../data/module/article.js'),
	url = require('url'),
	path = require('path'),
	formidable = require('formidable');

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
			result = await article.articleList(data)
			if (result) {
				res.json({
					data: result,
					status: 200,
					total: total
				})
			}
		} else {
			res.json({
				data: [],
				message: '你还没有发表过文章',
				status: 200,
				type: 'info',
				total: total
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
				message: '添加成功',
				type: 'success'
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
		let params = url.parse(req.url, true).query,
			data = !params.path ? [Number(params.currentPage), Number(params.pageSize)] : [params.path, Number(params.currentPage), Number(params.pageSize)], total, result;
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
			result = await article.articleStatus([Number(params.status), params.reason, Number(params.id)])
		if (result) {
			res.json({
				status: 200
			})
		}
	},
	// 电力云数据
	async getDlyGoods(req, res) {

		let result = await article.getDlyGoods()
		if (result) {
			res.json({
				status: 200,
				total: result.length,
				data: result,
			})
		}
		const list = []
		const goodsItem = [{ "id": "8895", "pic_url": "https:\/\/shop.9026.com\/web\/uploads\/mall21977\/20200813\/56e2c570ba24d54d0612915b030b2ee8.jpg" }]
		const ggz = [{ "attr_group_id": 1, "attr_group_name": "规格", "attr_list": [{ "attr_id": 2, "attr_name": "默认" }] }]
		const qyxg = [{ "list": [] }]
		const ggxq = [{ "id": 12096, "goods_id": 8330, "sign_id": "2", "stock": 1, "price": "0.00", "no": "", "weight": 0, "pic_url": "", "is_delete": 0, "attr_list": [{ "attr_group_name": "\u89c4\u683c", "attr_group_id": 1, "attr_id": 2, "attr_name": "\u9ed8\u8ba4" }] }]
		result.forEach((item, index) => {
			if (item.images1.length > 0) {
				// console.log(item.images1.indexOf(']', item.images1.length - 1))
				var str = ':"999"}]'
				if (item.images1.indexOf(']', item.images1.length - 1) < 0) {
					item.images1 = item.images1 + '"' + str
					item.images1 = item.images1.replace(/src/g, "pic_url").replace(/sort/g, "id")
				} else {
					item.images1 = item.images1.replace(/src/g, "pic_url").replace(/sort/g, "id")
				}
			} else {
				item.images1 = JSON.stringify([{ "pic_url": item.indexpic, "id": "1" }])
			}
			// if (item.images1.length > 0) {
			// 	item.images1 = item.images1.replace(/src/g, "pic_url").replace(/sort/g, "id")
			// } else {
			// 	item.images1 = JSON.stringify([{ "pic_url": item.indexpic, "id": "1" }])
			// }
			item.序号 = index + 1;
			item.商品名称 = item.title;
			item.原价 = item.price1;
			item.成本价 = item.price2
			item.商品详情 = result[index].description.length === 0 ? `<p>详情请联系客服</p><p><img src="${result[index].indexpic}" alt="" data-w-e="1"></p>` : `<p>${result[index].description}</p> <p><img src="${result[index].indexpic}" alt="" data-w-e="1"></p>`;
			item.商品缩略图 = item.indexpic;
			item.商品轮播图 = JSON.parse(item.images1);
			item.商品视频 = ' ';
			item.单位 = item.unit;
			item.售价 = item.price;
			item.是否使用规格 = 0;
			item.规格组 = ggz;
			item.商品库存 = item.stock;
			item.虚拟销量 = 0;
			item.购物数量限制 = 100;
			item.单品满件包邮 = 0;
			item.单品满额包邮 = 0;
			item.赠送积分 = 100;
			item.赠送积分类型 = 1;
			item.可抵扣积分 = 0;
			item.可抵扣积分类型 = 0;
			item.允许多件累计折扣 = 1;
			item.商品标识 = ' ';
			item.自定义分享图片 = ' ';
			item.自定义分享标题 = ' ';
			item.排序 = 100;
			item.限购订单 = -1;
			item.是否单独区域购买 = 0;
			item.区域限购详情 = qyxg;
			item.规格详情 = ggxq;
			item.是否快速购买 = 0;
			item.是否热销 = 0;
			item.是否面议 = 1
			delete item.price;
			delete item.title;
			delete item.price2;
			delete item.price1;
			delete item.unit;
			delete item.description;
			delete item.stock;
			delete item.images1;
			delete item.indexpic;
			list.push(item)
		})
		var fs = require('fs');
		var iconv = require('iconv-lite');
		const Json2csvParser = require('json2csv').Parser;
		const fields = Object.keys(list[0]);
		const json2csvParser = new Json2csvParser({ fields });
		const csv = json2csvParser.parse(list);
		fs.writeFile("./goods/goods.csv", iconv.encode(csv, 'GBK'), function (err) {
			if (err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		});
	},
	async getClass(req, res) {
		let result = await article.getClass()
		if (result) {
			res.json({
				status: 200,
				total: result.length,
				data: result,
			})
		}
		console.log(result[0])
		var fs = require('fs');
		var iconv = require('iconv-lite');
		const Json2csvParser = require('json2csv').Parser;
		const fields = Object.keys(result[0]);
		const json2csvParser = new Json2csvParser({ fields });
		const csv = json2csvParser.parse(result);
		fs.writeFile("./goods/class.csv", iconv.encode(csv, 'GBK'), function (err) {
			if (err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		});
	}
}