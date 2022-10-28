
var 公用模块 = require("../libs/gongyongmokuai.js");
var 数组操作 = require("../libs/mb_array.js");
var 转换操作 = require("../libs/mb_convert.js");
var 时间操作 = require("../libs/mb_date.js");
var 窗口操作 = require("../libs/mb_navigate.js");
var 读写设置 = require("../libs/mb_storage.js");
var 对话框 = require("../libs/mb_dialog/mb_dialog.js");
var 网络操作 = require("../libs/mb_request/mb_request.js");
var 菜单 = require("../libs/mb_menu/mb_menu.js");
var 剪贴板 = require("../libs/mb_clipboard/mb_clipboard.js");
var 顶部选项卡1;var 对话框1;var 网络操作1;var 电话列表1;var 图片框1;var 底部加载条1;var 菜单1;var 剪贴板1;var 编辑框1;
	var 接口
	var 页数=1
	var 顶部选项=0
	var 是否搜索=false
	var 当前表项=0
function 电话_被创建(启动参数){
	顶部选项卡1.添加项目("所有")
	顶部选项卡1.添加项目("来电")
	顶部选项卡1.添加项目("去电")
	顶部选项卡1.添加项目("未接")
	网络操作1.置请求头({"content-type": "application/json;charset=UTF-8"})
}
function 重新获取数据(){
	公用模块.获取签名()
	电话列表1.清空项目()
	底部加载条1.隐藏加载条()
	页数=1
	对话框1.显示等待框("读取中...")
	接口={"data": {"type": 顶部选项,"page_num": 1,"page_size": 10,"phone_number": ""},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
	网络操作1.发起请求(读写设置.读取设置("服务器")+"/call/query",接口,"POST")
}
function 电话_被显示(){

	if(读写设置.读取设置("秘钥") !="" && 读写设置.读取设置("服务器")!="" ){

		重新获取数据()
		}else{
		电话列表1.清空项目()
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

					读取所有(转换操作.json转文本(返回数据))
					if(长度<10 ){
						底部加载条1.显示加载条(false,"已经没有更多了...")
					}
				}


			break;
			case 1 :
				if(长度<1 ){
					底部加载条1.显示加载条(false,"已经没有更多了...")
					}else{

					读取呼入(转换操作.json转文本(返回数据))
					if(长度<10 ){
						底部加载条1.显示加载条(false,"已经没有更多了...")
					}
				}

			break;
			case 2 :
				if(长度<1 ){
					底部加载条1.显示加载条(false,"已经没有更多了...")
					}else{

					读取呼出(转换操作.json转文本(返回数据))
					if(长度<10 ){
						底部加载条1.显示加载条(false,"已经没有更多了...")
					}
				}

			break;
			case 3 :
				if(长度<1 ){
					底部加载条1.显示加载条(false,"已经没有更多了...")
					}else{

					读取未接(转换操作.json转文本(返回数据))
					if(长度<10 ){
						底部加载条1.显示加载条(false,"已经没有更多了...")
					}
				}
			break;
		}
		}else{
		电话列表1.清空项目()
		底部加载条1.显示加载条(false,"已经没有更多了...")
		对话框1.弹出提示("服务器连接失败!")
	}
}
function 秒到时间(秒){
	var 文本=""
	var 时间_秒=0
	var 时间_分=0
	时间_秒=转换操作.到数值(秒)
	if(时间_秒<60 ){
		文本=秒+"秒"
		}else{
		while(时间_秒/60>1){
			时间_秒=时间_秒-60
			时间_分=时间_分+1
		}
		if(时间_秒<60 ){
			文本=转换操作.到文本(时间_分)+"分"+时间_秒+"秒"
			}else{
			文本=转换操作.到文本(时间_分+1)+"分"
		}

	}
	return(" "+文本)
}
function 读取所有(数据){
	var json= 转换操作.文本转json(数据)
	var 计次=0
	var 类型=0

	while(计次<数组操作.取成员数(json.data)){
		类型=json.data[计次].type
		if(类型 != 1 && 类型 != 2 && 类型 !=3 ){
			电话列表1.添加项目("/images/wz.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
		}
		switch(类型){
			case 1 :
				switch(json.data[计次].sim_id){
					case 0 :
						电话列表1.添加项目("/images/hr.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim1.png","通话时间:"+秒到时间(json.data[计次].duration),"")
					break;
					case 1 :
						电话列表1.添加项目("/images/hr.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim2.png","通话时间:"+秒到时间(json.data[计次].duration),"")
					break;
					case -1 :
						电话列表1.添加项目("/images/hr.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
					break;
				}
				if(json.data[计次].sim_id > 1 ){
					电话列表1.添加项目("/images/hr.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
				}
			break;
			case 2 :
				switch(json.data[计次].sim_id){
					case 0 :
						电话列表1.添加项目("/images/hc.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim1.png","通话时间:"+秒到时间(json.data[计次].duration),"")
					break;
					case 1 :
						电话列表1.添加项目("/images/hc.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim2.png","通话时间:"+秒到时间(json.data[计次].duration),"")
					break;
					case -1 :
						电话列表1.添加项目("/images/hc.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
					break;
				}
				if(json.data[计次].sim_id > 1 ){
					电话列表1.添加项目("/images/hc.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
				}
			break;
			case 3 :
				switch(json.data[计次].sim_id){
					case 0 :
						电话列表1.添加项目("/images/wj.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim1.png","通话时间:"+秒到时间(json.data[计次].duration),"")
					break;
					case 1 :
						电话列表1.添加项目("/images/wj.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim2.png","通话时间:"+秒到时间(json.data[计次].duration),"")
					break;
					case -1 :
						电话列表1.添加项目("/images/wj.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
					break;
				}
				if(json.data[计次].sim_id > 1 ){
					电话列表1.添加项目("/images/wj.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
				}
			break;
		}
		计次=计次+1
	}
}
function 读取呼入(数据){
	var json= 转换操作.文本转json(数据)
	var 计次=0

	while(计次<数组操作.取成员数(json.data)){
		switch(json.data[计次].sim_id){
			case 0 :
				电话列表1.添加项目("/images/hr.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim1.png","通话时间:"+秒到时间(json.data[计次].duration),"")
			break;
			case 1 :
				电话列表1.添加项目("/images/hr.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim2.png","通话时间:"+秒到时间(json.data[计次].duration),"")
			break;
			case -1 :
				电话列表1.添加项目("/images/hr.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
			break;
		}
		if(json.data[计次].sim_id > 1 ){
			电话列表1.添加项目("/images/hr.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
		}
		计次=计次+1
	}
}
function 读取呼出(数据){
	var json= 转换操作.文本转json(数据)
	var 计次=0

	while(计次<数组操作.取成员数(json.data)){
		switch(json.data[计次].sim_id){
			case 0 :
				电话列表1.添加项目("/images/hc.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim1.png","通话时间:"+秒到时间(json.data[计次].duration),"")
			break;
			case 1 :
				电话列表1.添加项目("/images/hc.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim2.png","通话时间:"+秒到时间(json.data[计次].duration),"")
			break;
			case -1 :
				电话列表1.添加项目("/images/hc.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
			break;
		}
		if(json.data[计次].sim_id > 1 ){
			电话列表1.添加项目("/images/hc.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
		}
		计次=计次+1
	}
}
function 读取未接(数据){
	var json= 转换操作.文本转json(数据)
	var 计次=0

	while(计次<数组操作.取成员数(json.data)){
		switch(json.data[计次].sim_id){
			case 0 :
				电话列表1.添加项目("/images/wj.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim1.png","通话时间:"+秒到时间(json.data[计次].duration),"")
			break;
			case 1 :
				电话列表1.添加项目("/images/wj.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/sim2.png","通话时间:"+秒到时间(json.data[计次].duration),"")
			break;
			case -1 :
				电话列表1.添加项目("/images/wj.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
			break;
		}
		if(json.data[计次].sim_id > 1 ){
			电话列表1.添加项目("/images/wj.png",json.data[计次].name,json.data[计次].number,时间操作.时间到文本(时间操作.时间戳到时间(转换操作.到数值(json.data[计次].dateLong))),"/images/simx.png","通话时间:"+秒到时间(json.data[计次].duration),"")
		}
		计次=计次+1
	}
}
function 电话_被滑到底部(){
	页数=页数+1
	底部加载条1.显示加载条(true,"数据读取中...")
	switch(顶部选项){
		case 0 :
			if(是否搜索==true ){
				接口={"data": {"type": 0,"page_num": 页数,"page_size": 10,"phone_number": 编辑框1.取内容()},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 0,"page_num": 页数,"page_size": 10,"phone_number": ""},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}


		break;
		case 1 :
			if(是否搜索==true ){
				接口={"data": {"type": 1,"page_num": 页数,"page_size": 10,"phone_number": 编辑框1.取内容()},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 1,"page_num": 页数,"page_size": 10,"phone_number": ""},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}

		break;
		case 2 :
			if(是否搜索==true ){
				接口={"data": {"type": 2,"page_num": 页数,"page_size": 10,"phone_number": 编辑框1.取内容()},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 2,"page_num": 页数,"page_size": 10,"phone_number": ""},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}

		break;
		case 3 :
			if(是否搜索==true ){
				接口={"data": {"type": 3,"page_num": 页数,"page_size": 10,"phone_number": 编辑框1.取内容()},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 3,"page_num": 页数,"page_size": 10,"phone_number": ""},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}

		break;
	}

	对话框1.显示等待框("读取中...")
	网络操作1.发起请求(读写设置.读取设置("服务器")+"/call/query",接口,"POST")
}

function 顶部选项卡1_项目被单击(项目索引){
	页数=1
	顶部选项=项目索引
	电话列表1.清空项目()
	switch(顶部选项){
		case 0 :
			if(是否搜索==true ){
				接口={"data": {"type": 0,"page_num": 页数,"page_size": 10,"phone_number": 编辑框1.取内容()},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 0,"page_num": 页数,"page_size": 10,"phone_number": ""},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}

		break;
		case 1 :
			if(是否搜索==true ){
				接口={"data": {"type": 1,"page_num": 页数,"page_size": 10,"phone_number": 编辑框1.取内容()},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 1,"page_num": 页数,"page_size": 10,"phone_number": ""},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}

		break;
		case 2 :
			if(是否搜索==true ){
				接口={"data": {"type": 2,"page_num": 页数,"page_size": 10,"phone_number": 编辑框1.取内容()},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 2,"page_num": 页数,"page_size": 10,"phone_number": ""},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}

		break;
		case 3 :
			if(是否搜索==true ){
				接口={"data": {"type": 3,"page_num": 页数,"page_size": 10,"phone_number": 编辑框1.取内容()},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
				}else{
				接口={"data": {"type": 3,"page_num": 页数,"page_size": 10,"phone_number": ""},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
			}

		break;
	}
	对话框1.显示等待框("读取中...")
	网络操作1.发起请求(读写设置.读取设置("服务器")+"/call/query",接口,"POST")
}

function 编辑框1_按下某键(键代码){

	电话列表1.清空项目()

	if(编辑框1.取内容()=="" ){
		图片框1.置可视(false)
		是否搜索=false
		接口={"data": {"type": 0,"page_num": 1,"page_size": 10,"phone_number": ""},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
		}else{
		图片框1.置可视(true)
		是否搜索=true
		接口={"data": {"type": 0,"page_num": 1,"page_size": 10,"phone_number": 编辑框1.取内容()},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
	}
	对话框1.显示等待框("读取中...")
	网络操作1.发起请求(读写设置.读取设置("服务器")+"/call/query",接口,"POST")
}
function 图片框1_被单击(){
	if(是否搜索==true ){
		电话列表1.清空项目()
		编辑框1.置内容("")
		图片框1.置可视(false)
		是否搜索=false

		接口={"data": {"type": 0,"page_num": 1,"page_size": 10,"phone_number": ""},"timestamp": 读写设置.读取设置("time"),"sign": 读写设置.读取设置("sign")}
		对话框1.显示等待框("读取中...")
		网络操作1.发起请求(读写设置.读取设置("服务器")+"/call/query",接口,"POST")
	}
}

function 电话列表1_项目被单击(项目索引){
	当前表项=项目索引
	菜单1.显示菜单(["发送短信","拨打电话","复制号码"])
}

function 菜单1_菜单项被单击(菜单项索引){
	switch(菜单项索引){
		case 0 :

			窗口操作.切换窗口_非导航栏("fj?收件人="+电话列表1.取标签2标题(当前表项))
		break;
		case 1 :
			拨打电话(电话列表1.取标签2标题(当前表项))
		break;
		case 2 :
			剪贴板1.置剪贴板内容(电话列表1.取标签2标题(当前表项))
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
			对话框1.弹出提示("取消拨号")
		}

		}
		)
}
function 电话_正在下拉刷新(){
	窗口操作.停止下拉刷新()
	重新获取数据()
}

Page({
name:"dh",

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
电话列表1 = this.selectComponent("#mb_dhList1")
图片框1 = this.selectComponent("#mb_image1")
底部加载条1 = this.selectComponent("#mb_bottomLoading1")
菜单1 = new 菜单.菜单(菜单1_菜单项被单击,null)
剪贴板1 = new 剪贴板.剪贴板(null,null)
编辑框1 = this.selectComponent("#mb_input1")
电话_被创建(options)
},

//生命周期函数--监听页面初次渲染完成
onReady () {

},

//生命周期函数--监听页面显示
onShow () {
电话_被显示()
},

//生命周期函数--监听页面隐藏
onHide () {

},

//生命周期函数--监听页面卸载
onUnload () {

},

//页面相关事件处理函数--监听用户下拉动作
onPullDownRefresh () {
电话_正在下拉刷新()
},

//页面相关事件处理函数--监听页面被滑动
onPageScroll () {

},

//页面相关事件处理函数--监听页面被滑动到底部
onReachBottom () {
电话_被滑到底部()
},

//页面相关事件处理函数--监听导航栏被单击
onTabItemTap(item) {

},

顶部选项卡1项目被单击(e) {
顶部选项卡1_项目被单击(e.detail.项目索引)
},
电话列表1项目被单击(e) {
电话列表1_项目被单击(e.detail.项目索引)
},
图片框1被单击(e) {
图片框1_被单击()
},
编辑框1按下某键(e) {
编辑框1_按下某键(e.detail.键代码)
}

})