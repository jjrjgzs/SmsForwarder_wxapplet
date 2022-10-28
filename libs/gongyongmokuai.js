
var 转换操作 = require("mb_convert.js");
var 时间操作 = require("mb_date.js");
var 读写设置 = require("mb_storage.js");
import CryptoJS from "../files/crypto.js";
var hash = CryptoJS.HmacSHA256("时间戳" + "\n" + "sign", "sign");
function 获取签名(){

	var 签名=""
	var 秘钥=读写设置.读取设置("秘钥")
	var 时间戳=转换操作.到文本(时间操作.取时间戳(时间操作.取当前日期时间()))

	签名=CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(时间戳 + "\n" + 秘钥, 秘钥))
	读写设置.保存设置("time",时间戳)
	读写设置.保存设置("sign",encodeURIComponent(签名))
}
module.exports = {获取签名:获取签名};