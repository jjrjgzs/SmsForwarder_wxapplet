
var 窗口操作 = require("../libs/mb_navigate.js");
var 读写设置 = require("../libs/mb_storage.js");
var 对话框 = require("../libs/mb_dialog/mb_dialog.js");
var 剪贴板 = require("../libs/mb_clipboard/mb_clipboard.js");
var 加密操作 = require("../libs/mb_encrypt/mb_encrypt.js");
var 标签2;var 编辑框1;var 标签1;var 编辑框2;var 按钮1;var 对话框1;var 按钮2;var 剪贴板1;var 加密操作1;
function 查看短信_被创建(启动参数){
	编辑框1.置内容(启动参数.发件人)
	编辑框2.置内容(读写设置.读取设置("短信内容"))
	读写设置.保存设置("查看短信","是")
}

function 按钮1_被单击(){
	窗口操作.切换窗口_非导航栏("fj?收件人="+编辑框1.取内容())
}

function 按钮2_被单击(){
	剪贴板1.置剪贴板内容(编辑框2.取内容())
}

Page({
name:"ck",

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
对话框1 = new 对话框.对话框(null,null)
按钮2 = this.selectComponent("#mb_button2")
剪贴板1 = new 剪贴板.剪贴板(null,null)
加密操作1 = new 加密操作.加密操作()
查看短信_被创建(options)
},

//生命周期函数--监听页面初次渲染完成
onReady () {

},

//生命周期函数--监听页面显示
onShow () {

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
按钮2被单击(e) {
按钮2_被单击()
}

})