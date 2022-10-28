
var 公用模块 = require("../libs/gongyongmokuai.js");
var 数组操作 = require("../libs/mb_array.js");
var 转换操作 = require("../libs/mb_convert.js");
var 时间操作 = require("../libs/mb_date.js");
var 窗口操作 = require("../libs/mb_navigate.js");
var 读写设置 = require("../libs/mb_storage.js");
var 对话框 = require("../libs/mb_dialog/mb_dialog.js");
var 网络操作 = require("../libs/mb_request/mb_request.js");
var 顶部选项卡1;var 对话框1;var 网络操作1;var 编辑框1;var 短信列表框1;var 图片框1;var 底部加载条1;var 图片框2;
	var 接口={}
	var 页数=1
	var 顶部选项=0
	var 是否搜索=false
function 短信_被创建(启动参数){
	顶部选项卡1.设置项目(["收件箱","发件箱"])
	网络操作1.置请求头({"content-type": "application/json;charset=UTF-8"})
}
function 重新获取数据(){
	if(读写设置.读取设置("查看短信")=="是" ){
		读写设置.保存设置("查看短信","否")
		}else{
		公用模块.获取签名()
		页数=1
		短信列表框1.清空项目()
		底部加载条1.隐藏加载条()
		if(顶部选项==0 ){
			接口={"data": {"type": 1,"page_num": 1,"page_size": 10,"keyword": "", },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}else{
			接口={"data": {"type": 2,"page_num": 1,"page_size": 10,"keyword": "", },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
		}

		对话框1.显示等待框("读取中...")
		网络操作1.发起请求(读写设置.读取设置("服务器")+"/sms/query",接口,"POST")
	}
}
function 短信_被显示(){
	if(读写设置.读取设置("秘钥") !="" && 读写设置.读取设置("服务器")!="" ){

		重新获取数据()
		}else{
		短信列表框1.清空项目()
		底部加载条1.隐藏加载条()
		对话框1.弹出提示("请先连接主机!")
	}
}

function 网络操作1_发起请求完毕(状态码,返回数据){
	var 长度=0
	对话框1.关闭等待框()
	长度=数组操作.取成员数(返回数据.data)

	if(返回数据.code==200 ){
		switch(顶部选项){
			case 0 :
				if(长度<1 ){
					底部加载条1.显示加载条(false,"已经没有更多了...")
					}else{

					读取收件箱(转换操作.json转文本(返回数据))
					if(长度<10 ){
						底部加载条1.显示加载条(false,"已经没有更多了...")
					}
				}


			break;
			case 1 :
				if(长度<1 ){
					底部加载条1.显示加载条(false,"已经没有更多了...")
					}else{

					读取发件箱(转换操作.json转文本(返回数据))
					if(长度<10 ){
						底部加载条1.显示加载条(false,"已经没有更多了...")
					}
				}
			break;
		}
		}else{
		短信列表框1.清空项目()
		底部加载条1.显示加载条(false,"已经没有更多了...")
		对话框1.弹出提示("服务器连接失败!")
	}
}
function 读取收件箱(数据){
	var json= 转换操作.文本转json(数据)
	var 计次=0

	while(计次<数组操作.取成员数(json.data)){
		switch(json.data[计次].sim_id){
			case 0 :
				短信列表框1.添加项目(json.data[计次].number,json.data[计次].content,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].date))),"/images/sim1.png","/images/sj.png","")

			break;
			case 1 :
				短信列表框1.添加项目(json.data[计次].number,json.data[计次].content,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].date))),"/images/sim2.png","/images/sj.png","")
			break;
			case -1 :
				短信列表框1.添加项目(json.data[计次].number,json.data[计次].content,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].date))),"/images/simx.png","/images/sj.png","")
			break;
		}
		计次=计次+1
	}
}
function 读取发件箱(数据){
	var json= 转换操作.文本转json(数据)
	var 计次=0

	while(计次<数组操作.取成员数(json.data)){
		switch(json.data[计次].sim_id){
			case 0 :
				短信列表框1.添加项目(json.data[计次].number,json.data[计次].content,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].date))),"/images/sim1.png","/images/fj.png","")
			break;
			case 1 :
				短信列表框1.添加项目(json.data[计次].number,json.data[计次].content,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].date))),"/images/sim2.png","/images/fj.png","")
			break;
			case -1 :
				短信列表框1.添加项目(json.data[计次].number,json.data[计次].content,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].date))),"/images/simx.png","/images/fj.png","")
			break;
		}
		计次=计次+1
	}
}

function 短信_被滑到底部(){
	页数=页数+1
	底部加载条1.显示加载条(true,"数据读取中...")
	switch(顶部选项){
		case 0 :
			if(是否搜索==true ){
				接口={"data": {"type": 1,"page_num": 页数,"page_size": 10,"keyword":  编辑框1.取内容(), },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 1,"page_num": 页数,"page_size": 10,"keyword": "", },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}


		break;
		case 1 :
			if(是否搜索==true ){
				接口={"data": {"type": 2,"page_num": 页数,"page_size": 10,"keyword":  编辑框1.取内容(), },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 2,"page_num": 页数,"page_size": 10,"keyword": "", },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}
		break;
	}
	对话框1.显示等待框("读取中...")
	网络操作1.发起请求(读写设置.读取设置("服务器")+"/sms/query",接口,"POST")
}

function 顶部选项卡1_项目被单击(项目索引){
	页数=1
	底部加载条1.隐藏加载条()
	顶部选项=项目索引
	短信列表框1.清空项目()
	switch(顶部选项){
		case 0 :
			if(是否搜索==true ){
				接口={"data": {"type": 1,"page_num": 1,"page_size": 10,"keyword":  编辑框1.取内容(), },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 1,"page_num": 1,"page_size": 10,"keyword": "", },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}


		break;
		case 1 :
			if(是否搜索==true ){
				接口={"data": {"type": 2,"page_num": 1,"page_size": 10,"keyword":  编辑框1.取内容(), },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 2,"page_num": 1,"page_size": 10,"keyword": "", },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}


		break;
	}
	对话框1.显示等待框("读取中...")
	网络操作1.发起请求(读写设置.读取设置("服务器")+"/sms/query",接口,"POST")
}

function 图片框1_被单击(){
	if(是否搜索==true ){
		是否搜索=false
		图片框1.置可视(false)
		图片框2.置可视(true)
		编辑框1.置内容("")
		短信列表框1.清空项目()
		if(顶部选项==0 ){
			接口={"data": {"type": 1,"page_num": 1,"page_size": 10,"keyword":  "", },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}else{
			接口={"data": {"type": 2,"page_num": 1,"page_size": 10,"keyword":  "", },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
		}
		对话框1.显示等待框("读取中...")
		网络操作1.发起请求(读写设置.读取设置("服务器")+"/sms/query",接口,"POST")
	}

}

function 短信列表框1_项目被单击(项目索引){
	读写设置.保存设置("短信内容",短信列表框1.取标签2标题(项目索引))
	窗口操作.切换窗口_非导航栏("ck?发件人="+短信列表框1.取标签1标题(项目索引))
}

function 编辑框1_按下某键(键代码){
	短信列表框1.清空项目()
	if(编辑框1.取内容()=="" ){
		是否搜索=false
		图片框1.置可视(false)
		图片框2.置可视(true)
		if(顶部选项==0 ){
			接口={"data": {"type": 1,"page_num": 1,"page_size": 10,"keyword":  "", },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}else{
			接口={"data": {"type": 2,"page_num": 1,"page_size": 10,"keyword":  "", },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
		}

		}else{
		是否搜索=true
		图片框1.置可视(true)
		图片框2.置可视(false)
		if(顶部选项==0 ){
		  接口={"data": {"type": 1,"page_num": 1,"page_size": 10,"keyword":  编辑框1.取内容(), },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
		  }else{
		  接口={"data": {"type": 2,"page_num": 1,"page_size": 10,"keyword":  编辑框1.取内容(), },"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
	   }
	}
	对话框1.显示等待框("读取中...")
	网络操作1.发起请求(读写设置.读取设置("服务器")+"/sms/query",接口,"POST")
}
function 短信_正在下拉刷新(){
	窗口操作.停止下拉刷新()
	重新获取数据()
}
function 图片框2_被单击(){
	读写设置.保存设置("查看短信","是")
	窗口操作.切换窗口_非导航栏("fj")
}

Page({
name:"dx",

data: {
mb_freePanel:[false],
//页面相关数据
titleTop:'0px'
},

//生命周期函数--监听页面加载
onLoad: function (options) {
//初始化页面上的组件
顶部选项卡1 = this.selectComponent("#mb_navBar1")
对话框1 = new 对话框.对话框(null,null)
网络操作1 = new 网络操作.网络操作(网络操作1_发起请求完毕)
编辑框1 = this.selectComponent("#mb_input1")
短信列表框1 = this.selectComponent("#mb_dh1List1")
图片框1 = this.selectComponent("#mb_image1")
底部加载条1 = this.selectComponent("#mb_bottomLoading1")
图片框2 = this.selectComponent("#mb_image2")
短信_被创建(options)
},

//生命周期函数--监听页面初次渲染完成
onReady () {

},

//生命周期函数--监听页面显示
onShow () {
短信_被显示()
},

//生命周期函数--监听页面隐藏
onHide () {

},

//生命周期函数--监听页面卸载
onUnload () {

},

//页面相关事件处理函数--监听用户下拉动作
onPullDownRefresh () {
短信_正在下拉刷新()
},

//页面相关事件处理函数--监听页面被滑动
onPageScroll () {

},

//页面相关事件处理函数--监听页面被滑动到底部
onReachBottom () {
短信_被滑到底部()
},

//页面相关事件处理函数--监听导航栏被单击
onTabItemTap(item) {

},

顶部选项卡1项目被单击(e) {
顶部选项卡1_项目被单击(e.detail.项目索引)
},
编辑框1按下某键(e) {
编辑框1_按下某键(e.detail.键代码)
},
短信列表框1项目被单击(e) {
短信列表框1_项目被单击(e.detail.项目索引)
},
图片框1被单击(e) {
图片框1_被单击()
},
图片框2被单击(e) {
图片框2_被单击()
}

})