const path = require('path')

    // 用于通知验签
    // ------配置 alipay SDK 环境
    // 导入 SDK
    , AlipaySDK = require("alipay-sdk").default
    // 导入配置
    , alipayConfig = require(path.join(__dirname, './alipay_config.js'))
    // 初始化
    , alipaySdk = new AlipaySDK(alipayConfig.AlipayBaseConfig)

async function checkNotify(obj) {
    const result = await alipaySdk.checkNotifySign(obj);
    return result;
}

module.exports = checkNotify;
