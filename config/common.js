
// 支付宝验签模块
const path = require('path')
// 导入 sdk
const AlipaySDK = require('alipay-sdk').default
// 导入配置文件
const common = require('../config/config')
// 初始化
const alipaySdk = new AlipaySDK(common.alipayConfig)

let checkNotify = async (obj) => {
  const result = await alipaySdk.checkNotifySign(obj)
  return result
}

module.exports = checkNotify