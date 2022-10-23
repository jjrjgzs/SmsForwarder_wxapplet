
var 数组操作 = require("../libs/mb_array.js");
var 转换操作 = require("../libs/mb_convert.js");
var 数学操作 = require("../libs/mb_math.js");
var 窗口操作 = require("../libs/mb_navigate.js");
var 读写设置 = require("../libs/mb_storage.js");
var 对话框 = require("../libs/mb_dialog/mb_dialog.js");
var 网络操作 = require("../libs/mb_request/mb_request.js");
var 菜单 = require("../libs/mb_menu/mb_menu.js");
var 剪贴板 = require("../libs/mb_clipboard/mb_clipboard.js");
var 对话框1;var 网络操作1;var 通讯录列表1;var 菜单1;var 编辑框1;var 图片框1;var 底部加载条1;var 剪贴板1;
var 当前表项=0
function 通讯录_被创建(启动参数){
	网络操作1.置请求头({"content-type": "application/json;charset=UTF-8"})
}
function 重新获取数据(){

	底部加载条1.隐藏加载条()
	var data={"data": {"phone_number": "","name": "",},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
	对话框1.显示等待框("读取中...")
	网络操作1.发起请求(读写设置.读取设置("服务器")+"/contact/query",data,"POST")
}
function 通讯录_被显示(){
	重新获取数据()
}

function 网络操作1_发起请求完毕(状态码,返回数据){
	var 计次=0
	var 头像=""
	对话框1.关闭等待框()
	通讯录列表1.清空项目()

	if(状态码==0 ){
		while(计次<数组操作.取成员数(返回数据.data)){
			头像="https://ui-avatars.com/api/?name="+返回数据.data[计次].name+"&length=1&background=random&size=128&bold=true&color=ff0000"
			通讯录列表1.添加项目(头像,返回数据.data[计次].name,返回数据.data[计次].phone_number,"")
			计次=计次+1
		}
		}else{

		对话框1.弹出提示("服务器连接失败!")
	}
	底部加载条1.显示加载条(false,"已经没有更多了...")
}

function 菜单1_菜单项被单击(菜单项索引){
	switch(菜单项索引){
		case 0 :

			窗口操作.切换窗口_非导航栏("fj?收件人="+通讯录列表1.取标签2标题(当前表项))
		break;
		case 1 :
			拨打电话(通讯录列表1.取标签2标题(当前表项))
		break;
		case 2 :
			剪贴板1.置剪贴板内容(通讯录列表1.取标签2标题(当前表项))
		break;
	}
}
function 拨打电话(号码){
	wx.makePhoneCall({
		phoneNumber:号码,
		success: function(){
			对话框1.弹出提示2("拨打成功")

		},
		fail: function (){
			对话框1.弹出提示("取消拨打")
		}

		}
		)
}

function 图片框1_被单击(){

	编辑框1.置内容("")

	var data={"data": {"phone_number": "","name": "",},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
	对话框1.显示等待框("读取中...")
	网络操作1.发起请求(读写设置.读取设置("服务器")+"/contact/query",data,"POST")

}

function 编辑框1_按下某键(键代码){
	var data={}

	if(编辑框1.取内容()=="" ){

		data ={"data": {"phone_number": "","name": "",},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
		}else{

		if(转换操作.到文本(数学操作.取整数(转换操作.到数值(编辑框1.取内容()))) !="NaN" ){
			data={"data": {"phone_number": 编辑框1.取内容(),"name": "",},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}else{
			data={"data": {"phone_number": "","name": 编辑框1.取内容(),},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}

		}
	}
	对话框1.显示等待框("读取中...")
	网络操作1.发起请求(读写设置.读取设置("服务器")+"/contact/query",data,"POST")
}
function 通讯录_正在下拉刷新(){
	窗口操作.停止下拉刷新()
	重新获取数据()
}
function 通讯录列表1_项目被单击(项目索引){
	当前表项=项目索引
	菜单1.显示菜单(["发送短信","拨打电话","复制号码"])
}

Page({
name:"txl",

data: {
mb_freePanel:[false],
//页面相关数据
titleTop:'0px'
},

//生命周期函数--监听页面加载
onLoad: function (options) {
//初始化页面上的组件
对话框1 = new 对话框.对话框(null,null)
网络操作1 = new 网络操作.网络操作(网络操作1_发起请求完毕)
通讯录列表1 = this.selectComponent("#mb_dh6List1")
菜单1 = new 菜单.菜单(菜单1_菜单项被单击,null)
编辑框1 = this.selectComponent("#mb_input1")
图片框1 = this.selectComponent("#mb_image1")
底部加载条1 = this.selectComponent("#mb_bottomLoading1")
剪贴板1 = new 剪贴板.剪贴板(null,null)
通讯录_被创建(options)
},

//生命周期函数--监听页面初次渲染完成
onReady () {

},

//生命周期函数--监听页面显示
onShow () {
通讯录_被显示()
},

//生命周期函数--监听页面隐藏
onHide () {

},

//生命周期函数--监听页面卸载
onUnload () {

},

//页面相关事件处理函数--监听用户下拉动作
onPullDownRefresh () {
通讯录_正在下拉刷新()
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

通讯录列表1项目被单击(e) {
通讯录列表1_项目被单击(e.detail.项目索引)
},
编辑框1按下某键(e) {
编辑框1_按下某键(e.detail.键代码)
},
图片框1被单击(e) {
图片框1_被单击()
}

})