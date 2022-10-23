
var 文本操作 = require("../libs/mb_string.js");
var 数组操作 = require("../libs/mb_array.js");
var 转换操作 = require("../libs/mb_convert.js");
var 时间操作 = require("../libs/mb_date.js");
var 窗口操作 = require("../libs/mb_navigate.js");
var 读写设置 = require("../libs/mb_storage.js");
var 导航栏 = require("../libs/mb_tabBar/mb_tabBar.js");
var 网络操作 = require("../libs/mb_request/mb_request.js");
var 对话框 = require("../libs/mb_dialog/mb_dialog.js");
var 菜单 = require("../libs/mb_menu/mb_menu.js");
var 导航栏1;var 在线列表1;var 悬浮按钮1;var 标签1;var 标签2;var 编辑框1;var 编辑框2;var 按钮1;var 图片框1;var 按钮2;var 网络操作1;var 对话框1;var 网络操作2;var 编辑框3;var 标签3;var 菜单1;
	var 当前项目=0
	var 是否编辑=false
	var 是否按钮=false
	var 是否测试=false
	var 已连主机=""
	var 已连秘钥=""
	import CryptoJS from "../files/crypto.js";
	var hash = CryptoJS.HmacSHA256("时间戳" + "\n" + "sign", "sign");
function 主窗口_被创建(启动参数){
	初始化列表()
	网络操作1.置请求头({"content-type": "application/json;charset=UTF-8"})
}
function 获取签名(){
	var 签名=""
	var 秘钥=读写设置.读取设置("秘钥")
	var 时间戳=转换操作.到文本(时间操作.取时间戳(时间操作.取当前日期时间()))

	签名=CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(时间戳 + "\n" + 秘钥, 秘钥))
	读写设置.保存设置("time",时间戳)
	读写设置.保存设置("sign",encodeURIComponent(签名))
}
function 初始化列表(){
	var 计次=0
	var 分割
	var 列表
	var 主机=""

	主机=读写设置.读取设置("主机列表")

	分割=文本操作.分割文本(主机,"\n")
	while(计次<数组操作.取成员数(分割)){
		列表=文本操作.分割文本(分割[计次],"#")
		if(列表[0]!="" ){
			在线列表1.添加项目("/images/sy.png",列表[0],列表[1],"操作",列表[2])
		}

		计次=计次+1
	}
}
function 按钮1_被单击(){
	var 主机=""
	if(编辑框1.取内容()=="" || 编辑框2.取内容()=="" || 编辑框3.取内容()=="" ){
		对话框1.信息框("提示","信息不完整!")
		}else{
		if(是否编辑==true ){
			是否编辑=false
			if(在线列表1.取连接标题(当前项目) == "已连接" ){
				读写设置.保存设置("服务器","")
			    在线列表1.置头像地址(当前项目,"/images/sy.png")
			    在线列表1.置连接标题(当前项目,"操作")
			}
			在线列表1.置标题标题(当前项目,编辑框1.取内容())
			在线列表1.置信息标题(当前项目,编辑框2.取内容())
			在线列表1.置项目标记(当前项目,编辑框3.取内容())
			保存主机数据()
			窗口操作.隐藏面板(0,2)
			对话框1.弹出提示2("已保存")
			}else{
			主机=读写设置.读取设置("主机列表")+编辑框1.取内容()+"#"+编辑框2.取内容()+"#"+编辑框3.取内容()+"\n"
			读写设置.保存设置("主机列表",主机)
			在线列表1.添加项目("/images/sy.png",编辑框1.取内容(),编辑框2.取内容(),"操作",编辑框3.取内容())
			对话框1.弹出提示2("已添加")
			if(文本操作.取文本左边(编辑框1.取内容(),2)=="主机" ){
				编辑框1.置内容("主机"+转换操作.到文本(在线列表1.取项目总数()+1))
			}
		}
	}

}

function 悬浮按钮1_被单击(){
	编辑框1.置内容("主机"+转换操作.到文本(在线列表1.取项目总数()+1))
	编辑框2.置内容("https://")
	编辑框3.置内容("")
	按钮1.置标题("添加")
	窗口操作.显示面板(0,2)
}

function 图片框1_被单击(){
	是否测试=false
	窗口操作.隐藏面板(0,2)
}

function 按钮2_被单击(){
	已连秘钥=读写设置.读取设置("秘钥")
	读写设置.保存设置("秘钥",编辑框3.取内容())
	获取签名()
	是否测试=true
	读写设置.保存设置("秘钥",已连秘钥)
	var data={ "data": {},"timestamp": 读写设置.读取设置("time"),"sign":读写设置.读取设置("sign")}
	网络操作1.发起请求(编辑框2.取内容()+"/config/query",data,"POST")

}

function 网络操作1_发起请求完毕(状态码,返回数据){
	var 计次=0


	if(文本操作.寻找文本(转换操作.json转文本(返回数据),"200",0) != -1 ){
		if(是否测试==true ){
			是否测试=false
			对话框1.弹出提示2("连接成功")
			}else{

			while(计次<在线列表1.取项目总数()){
				if(读写设置.读取设置("服务器")==在线列表1.取信息标题(计次) ){
					当前项目=计次
					在线列表1.置头像地址(计次,"/images/lj.png")
					在线列表1.置连接标题(计次,"已连接")
					}else{
					在线列表1.置连接标题(计次,"操作")
					在线列表1.置头像地址(计次,"/images/sy.png")
				}
				计次=计次+1
			}
			读写设置.保存设置("sim-1",文本操作.子文本替换(返回数据.data.extra_sim1,"\\+86",""))
	        读写设置.保存设置("sim-2",文本操作.子文本替换(返回数据.data.extra_sim2,"\\+86",""))
			已连主机=读写设置.读取设置("服务器")
			已连秘钥=读写设置.读取设置("秘钥")
			if(是否按钮==true ){
				是否按钮=false
				对话框1.弹出提示2("连接成功")
			}
		}
		}else{
		是否按钮=false
		是否测试=false
		读写设置.保存设置("秘钥",已连秘钥)
        读写设置.保存设置("服务器",已连主机)
		if(返回数据.msg==undefined ){
			对话框1.弹出提示("连接失败,错误代码∶404")
			}else{
			对话框1.弹出提示("连接失败,错误代码∶"+返回数据.msg)
		}
	}

}

function 保存主机数据(){
	var 计次=0
	var 主机=""
	while(计次<在线列表1.取项目总数()){
		主机=主机+在线列表1.取标题标题(计次)+"#"+在线列表1.取信息标题(计次)+"#"+在线列表1.取项目标记(计次)+"\n"
		计次=计次+1
	}
	读写设置.保存设置("主机列表",主机)
}
function 菜单1_菜单项被单击(菜单项索引){

	switch(菜单项索引){
		case 0 :
			是否按钮=true
			读写设置.保存设置("服务器",在线列表1.取信息标题(当前项目))
			读写设置.保存设置("秘钥",在线列表1.取项目标记(当前项目))
			获取签名()
			var data={ "data": {},"timestamp": 读写设置.读取设置("time"),"sign":读写设置.读取设置("sign")}
			网络操作1.发起请求(读写设置.读取设置("服务器")+"/config/query",data,"POST")
		break;
		case 1 :
			if(在线列表1.取连接标题(当前项目)=="已连接" ){
				读写设置.保存设置("服务器","")
				在线列表1.置头像地址(当前项目,"/images/sy.png")
				在线列表1.置连接标题(当前项目,"操作")
			}
		break;
		case 2 :
			是否编辑=true
			按钮1.置标题("保存编辑")
			编辑框1.置内容(在线列表1.取标题标题(当前项目))
	        编辑框2.置内容(在线列表1.取信息标题(当前项目))
	        编辑框3.置内容(在线列表1.取项目标记(当前项目))
	        窗口操作.显示面板(0,2)
		break;
		case 3 :
			if(在线列表1.取连接标题(当前项目)=="已连接" ){
				读写设置.保存设置("服务器","")
			}
			在线列表1.删除项目(当前项目)
			保存主机数据()
			对话框1.弹出提示2("已删除")
		break;
		case 4 :
			对话框1.询问框("提示","是否清空所有主机?","确定","取消")
		break;
	}
}
function 在线列表1_连接被单击(项目索引){
	当前项目=项目索引
	菜单1.显示菜单(["连接主机","断开主机","编辑主机","删除主机","清空主机"])
}
function 主窗口_被显示(){

	if(读写设置.读取设置("秘钥") !="" && 读写设置.读取设置("服务器")!="" ){
		获取签名()
		var data={ "data": {},"timestamp": 读写设置.读取设置("time"),"sign":读写设置.读取设置("sign")}
		网络操作1.发起请求(读写设置.读取设置("服务器")+"/config/query",data,"POST")
	}

}
function 对话框1_询问框被单击(按钮索引){
	if(按钮索引==0 ){
		在线列表1.清空项目()
		读写设置.清空设置()
	}
}

Page({
name:"index",

data: {
mb_freePanel:[false],
//页面相关数据
titleTop:'0px'
},

//生命周期函数--监听页面加载
onLoad: function (options) {
//初始化页面上的组件
导航栏1 = new 导航栏.导航栏()
在线列表1 = this.selectComponent("#mb_zxList1")
悬浮按钮1 = this.selectComponent("#mb_floatButton1")
标签1 = this.selectComponent("#mb_text1")
标签2 = this.selectComponent("#mb_text2")
编辑框1 = this.selectComponent("#mb_input1")
编辑框2 = this.selectComponent("#mb_input2")
按钮1 = this.selectComponent("#mb_button1")
图片框1 = this.selectComponent("#mb_image1")
按钮2 = this.selectComponent("#mb_button2")
网络操作1 = new 网络操作.网络操作(网络操作1_发起请求完毕)
对话框1 = new 对话框.对话框(null,对话框1_询问框被单击)
网络操作2 = new 网络操作.网络操作(null)
编辑框3 = this.selectComponent("#mb_input3")
标签3 = this.selectComponent("#mb_text3")
菜单1 = new 菜单.菜单(菜单1_菜单项被单击,null)
主窗口_被创建(options)
},

//生命周期函数--监听页面初次渲染完成
onReady () {

},

//生命周期函数--监听页面显示
onShow () {
主窗口_被显示()
},

//生命周期函数--监听页面隐藏
onHide () {

},

//生命周期函数--监听页面卸载
onUnload () {

},

//页面相关事件处理函数--监听用户下拉动作
onPullDownRefresh () {

},

//页面相关事件处理函数--监听页面被滑动
onPageScroll () {

},

//页面相关事件处理函数--监听页面被滑动到底部
onReachBottom () {

},

//页面相关事件处理函数--监听导航栏被单击
onTabItemTap(item) {

},

在线列表1连接被单击(e) {
在线列表1_连接被单击(e.detail.项目索引)
},
悬浮按钮1被单击(e) {
悬浮按钮1_被单击()
},
按钮1被单击(e) {
按钮1_被单击()
},
图片框1被单击(e) {
图片框1_被单击()
},
按钮2被单击(e) {
按钮2_被单击()
}

})