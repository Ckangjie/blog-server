const fs = require('fs');
const path = require('path');
// 这里配置基本信息
// const AlipayBaseConfig = {
//     appId: '', // 应用 ID
//     privateKey: fs.readFileSync(path.join(__dirname, './pem/'), 'ascii'), // 应用私钥
//     alipayPublicKey: '',// 支付宝公钥
//     gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝的应用网关，此时为沙箱环境的网关
//     charset: 'utf-8',	// 字符集编码
//     version: '1.0',		// 版本，默认 1.0
//     signType: 'RSA2'		// 秘钥的解码版本
// };

module.exports = {
    AlipayBaseConfig: AlipayBaseConfig,	// 将配置模块暴露供初始化调用
}
