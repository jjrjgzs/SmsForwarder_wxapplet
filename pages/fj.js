
var 公用模块 = require("../libs/gongyongmokuai.js");
var 读写设置 = require("../libs/mb_storage.js");
var 对话框 = require("../libs/mb_dialog/mb_dialog.js");
var 网络操作 = require("../libs/mb_request/mb_request.js");
var 标签2;var 编辑框1;var 标签1;var 编辑框2;var 按钮1;var 对话框1;var 网络操作1;var 单选框1;
var 当前卡项=1
function 发件_被创建(启动参数){
	网络操作1.置请求头({"content-type": "application/json;charset=UTF-8"})
	编辑框1.置内容(启动参数.收件人)
}

function 按钮1_被单击(){

	if(编辑框1.取内容()=="" || 编辑框2.取内容()=="" ){
		对话框1.信息框("提示","请输入完整信息!")
		}else{
		对话框1.询问框("提示","是否向【"+编辑框1.取内容()+"】发送短信?","发送","取消")

	}
}

function 网络操作1_发起请求完毕(状态码,返回数据){
	对话框1.关闭等待框()
	对话框1.弹出提示2("已发送")
}

function 发件_被显示(){
	单选框1.添加("sim-1",读写设置.读取设置("sim-1"),true)
	单选框1.添加("sim-2",读写设置.读取设置("sim-2"),false)
	单选框1.添加完毕()
}

function 单选框1_选中项被改变(名称){
	if(名称=="sim-1" ){
		当前卡项=1
		}else{
		当前卡项=2
	}
}
function 对话框1_询问框被单击(按钮索引){
	var 接口={}
	if(按钮索引==0 ){
		接口={ "data": {"sim_slot": 当前卡项,"phone_numbers": 编辑框1.取内容(),"msg_content": 编辑框2.取内容()},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
	    对话框1.显示等待框("发送中...")
	    网络操作1.发起请求(读写设置.读取设置("服务器")+"/sms/send",接口,"POST")
	}
}

Page({
name:"fj",

data: {
mb_freePanel:[false],
//页面相关数据
titleTop:'0px'
},

//生命周期函数--监听页面加载
onLoad: function (options) {
//初始化页面上的组件
标签2 = this.selectComponent("#mb_text2")
编辑框1 = this.selectComponent("#mb_input1")
标签1 = this.selectComponent("#mb_text1")
编辑框2 = this.selectComponent("#mb_input2")
按钮1 = this.selectComponent("#mb_button1")
对话框1 = new 对话框.对话框(null,对话框1_询问框被单击)
网络操作1 = new 网络操作.网络操作(网络操作1_发起请求完毕)
单选框1 = this.selectComponent("#mb_radio1")
发件_被创建(options)
},

//生命周期函数--监听页面初次渲染完成
onReady () {

},

//生命周期函数--监听页面显示
onShow () {
发件_被显示()
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

按钮1被单击(e) {
按钮1_被单击()
},
单选框1选中项被改变(e) {
单选框1_选中项被改变(e.detail.名称)
}

})