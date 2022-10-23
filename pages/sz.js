
var 文本操作 = require("../libs/mb_string.js");
var 窗口操作 = require("../libs/mb_navigate.js");
var 读写设置 = require("../libs/mb_storage.js");
var 对话框 = require("../libs/mb_dialog/mb_dialog.js");
var 网络操作 = require("../libs/mb_request/mb_request.js");
var 顶部选项卡1;var 消息列表框1;var 对话框1;var 网络操作1;var 设置列表框1;var 标签2;var 编辑框1;var 标签3;var 编辑框2;var 按钮1;
	var 顶部选项 =0
	var sim_1=""
	var sim_2=""
function 设置_被创建(启动参数){
	网络操作1.置请求头({"content-type": "application/json;charset=UTF-8"})
	顶部选项卡1.设置项目(["设备信息","电池详情","远程WOL"])
	窗口操作.隐藏面板(0,1)
}
function 重新获取数据(){
	var data={ "data": {},"timestamp": 读写设置.读取设置("time"),"sign":读写设置.读取设置("sign")}

	消息列表框1.清空项目()
	设置列表框1.清空项目()

	switch(顶部选项){
	case 0 :

		对话框1.显示等待框("读取中...")
		网络操作1.发起请求(读写设置.读取设置("服务器")+"/config/query",data,"POST")
	break;
	case 1 :

		对话框1.显示等待框("读取中...")
		网络操作1.发起请求(读写设置.读取设置("服务器")+"/battery/query",data,"POST")
		break;
	}
}
function 设置_被显示(){
	重新获取数据()
}
function 网络操作1_发起请求完毕(状态码,返回数据){

	对话框1.关闭等待框()
	if(状态码==0 ){
		switch(顶部选项){
			case 0 :

				消息列表框1.添加项目("/images/bb.png","设备备注",返回数据.data.extra_device_mark,"","","")
				消息列表框1.添加项目("/images/bb.png","SIM1备注",文本操作.子文本替换(返回数据.data.extra_sim1,"\\+86",""),"点击显示实时SIM号码","","")
				消息列表框1.添加项目("/images/bb.png","SIM2备注",文本操作.子文本替换(返回数据.data.extra_sim2,"\\+86",""),"点击显示实时SIM号码","","")
				if(消息列表框1.取项目信息(2)!="" ){
					sim_1=返回数据.data.sim_info_list[0].carrier_name+"_"+文本操作.子文本替换(返回数据.data.sim_info_list[0].number,"\\+86","")
					sim_2=返回数据.data.sim_info_list[1].carrier_name+"_"+文本操作.子文本替换(返回数据.data.sim_info_list[1].number,"\\+86","")
					}else{
					sim_1=返回数据.data.sim_info_list[0].carrier_name+"_"+文本操作.子文本替换(返回数据.data.sim_info_list[0].number,"\\+86","")
				}

				if(返回数据.data.enable_api_battery_query==true ){
					设置列表框1.添加项目("/images/xq.png","远程查电量",false,true,true,"")
					}else{
					设置列表框1.添加项目("/images/xq.png","远程查电量",false,true,false,"")
				}
				if(返回数据.data.enable_api_call_query==true ){
					设置列表框1.添加项目("/images/xq.png","远程查通话",false,true,true,"")
					}else{
					设置列表框1.添加项目("/images/xq.png","远程查通话",false,true,false,"")
				}
				if(返回数据.data.enable_api_contact_query==true ){
					设置列表框1.添加项目("/images/xq.png","远程查话簿",false,true,true,"")
					}else{
					设置列表框1.添加项目("/images/xq.png","远程查话簿",false,true,false,"")
				}
				if(返回数据.data.enable_api_sms_query==true ){
					设置列表框1.添加项目("/images/xq.png","远程查短信",false,true,true,"")
					}else{
					设置列表框1.添加项目("/images/xq.png","远程查短信",false,true,false,"")
				}
				if(返回数据.data.enable_api_sms_send==true ){
					设置列表框1.添加项目("/images/xq.png","远程发短信",false,true,true,"")
					}else{
					设置列表框1.添加项目("/images/xq.png","远程发短信",false,true,false,"")
				}
				if(返回数据.data.enable_api_wol==true ){
					设置列表框1.添加项目("/images/xq.png","远程WOL",false,true,true,"")
					}else{
					设置列表框1.添加项目("/images/xq.png","远程WOL",false,true,false,"")
				}
			break;
			case 1 :

				设置列表框1.添加项目("/images/dc.png","剩余电量∶"+返回数据.data.level,false,false,false,"")
				设置列表框1.添加项目("/images/dc.png","充满电量∶"+返回数据.data.scale,false,false,false,"")
				设置列表框1.添加项目("/images/dc.png","当前电压∶"+返回数据.data.voltage,false,false,false,"")
				设置列表框1.添加项目("/images/dc.png","当前温度∶"+返回数据.data.temperature,false,false,false,"")
				设置列表框1.添加项目("/images/dc.png","电池状态∶"+返回数据.data.status,false,false,false,"")
				设置列表框1.添加项目("/images/dc.png","健康度∶"+返回数据.data.health,false,false,false,"")
				设置列表框1.添加项目("/images/dc.png","充电器∶"+返回数据.data.plugged,false,false,false,"")
			break;
			case 2 :
				对话框1.弹出提示2("发送成功")
			break;
		}

		}else{
		消息列表框1.清空项目()
		对话框1.弹出提示("服务器连接失败!")
	}
}

function 顶部选项卡1_项目被单击(项目索引){
	var data={}
	顶部选项=项目索引
	消息列表框1.清空项目()
	设置列表框1.清空项目()
	switch(项目索引){
		case 0 :

			窗口操作.隐藏面板(0,1)
			data={ "data": {},"timestamp": 读写设置.读取设置("time"),"sign":读写设置.读取设置("sign")}
			对话框1.显示等待框("读取中...")
			网络操作1.发起请求(读写设置.读取设置("服务器")+"/config/query",data,"POST")

			设置列表框1.置可视(true)
			消息列表框1.置可视(true)
		break;
		case 1 :

			窗口操作.隐藏面板(0,1)
			data={ "data": {},"timestamp": 读写设置.读取设置("time"),"sign":读写设置.读取设置("sign")}
			对话框1.显示等待框("读取中...")
			网络操作1.发起请求(读写设置.读取设置("服务器")+"/battery/query",data,"POST")
			设置列表框1.置可视(true)

			消息列表框1.置可视(false)

		break;
		case 2 :

			设置列表框1.置可视(false)
			消息列表框1.置可视(false)
			标签2.置可视(true)
			标签3.置可视(true)
			编辑框1.置可视(true)
			编辑框2.置可视(true)
			按钮1.置可视(true)
			窗口操作.显示面板(0,1)
		break;
	}




}

function 设置列表框1_开关被单击(项目索引,开关状态){
	对话框1.弹出提示("开关请在手机端设置")
	if(开关状态==true ){
		设置列表框1.置开关状态(项目索引,false)
		}else{
		设置列表框1.置开关状态(项目索引,true)
	}
}

function 按钮1_被单击(){
	var data= {"data": {"mac": 编辑框1.取内容(),"ip": 编辑框2.取内容() },"timestamp": 读写设置.读取设置("time"),"sign":读写设置.读取设置("sign")}
	对话框1.显示等待框("读取中...")
	网络操作1.发起请求(读写设置.读取设置("服务器")+"/wol/send",data,"POST")
}

function 设置_正在下拉刷新(){
	窗口操作.停止下拉刷新()
	重新获取数据()
}
function 消息列表框1_表项被单击(项目索引){

	if(消息列表框1.取项目总数() > 3 ){
		消息列表框1.删除项目(3)
		消息列表框1.删除项目(3)
		消息列表框1.置项目时间(1,"点击显示实时SIM号码")
		消息列表框1.置项目时间(2,"点击显示实时SIM号码")
		}else{
		消息列表框1.置项目时间(1,"点击隐藏实时SIM号码")
		消息列表框1.置项目时间(2,"点击隐藏实时SIM号码")
		消息列表框1.添加项目("/images/bb.png","实时SIM1",sim_1,"","","")
	    消息列表框1.添加项目("/images/bb.png","实时SIM2",sim_2,"","","")
	}
}

Page({
name:"sz",

data: {
mb_freePanel:[false],
//页面相关数据
titleTop:'0px'
},

//生命周期函数--监听页面加载
onLoad: function (options) {
//初始化页面上的组件
顶部选项卡1 = this.selectComponent("#mb_navBar1")
消息列表框1 = this.selectComponent("#mb_messagelist1")
对话框1 = new 对话框.对话框(null,null)
网络操作1 = new 网络操作.网络操作(网络操作1_发起请求完毕)
设置列表框1 = this.selectComponent("#mb_settinglist1")
标签2 = this.selectComponent("#mb_text2")
编辑框1 = this.selectComponent("#mb_input1")
标签3 = this.selectComponent("#mb_text3")
编辑框2 = this.selectComponent("#mb_input2")
按钮1 = this.selectComponent("#mb_button1")
设置_被创建(options)
},

//生命周期函数--监听页面初次渲染完成
onReady () {

},

//生命周期函数--监听页面显示
onShow () {
设置_被显示()
},

//生命周期函数--监听页面隐藏
onHide () {

},

//生命周期函数--监听页面卸载
onUnload () {

},

//页面相关事件处理函数--监听用户下拉动作
onPullDownRefresh () {
设置_正在下拉刷新()
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

顶部选项卡1项目被单击(e) {
顶部选项卡1_项目被单击(e.detail.项目索引)
},
消息列表框1表项被单击(e) {
消息列表框1_表项被单击(e.detail.项目索引)
},
设置列表框1开关被单击(e) {
设置列表框1_开关被单击(e.detail.项目索引,e.detail.开关状态)
},
按钮1被单击(e) {
按钮1_被单击()
}

})