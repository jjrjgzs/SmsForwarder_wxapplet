function 切换窗口_非导航栏(page) { 
    wx.navigateTo({
        url: page
    });
}

function 切换窗口_重定向(page) { 
    wx.redirectTo({
        url: page
    });
}

function 切换窗口_重启(page) { 
    wx.reLaunch({
        url: page
    });
}

function 切换窗口_导航栏(page) { 
    wx.switchTab({
        url: page/*,
        success: function (e) {
            var p = getCurrentPages().pop();
            if (p == undefined || p == null) {
                return;
            }else{
                p.onLoad({"c":"789"});//调用被切换到的窗口的onLoad函数，并将参数传递过去。
            }
        }*/
    });
}

function 切换窗口_返回(page) { 
    wx.navigateBack({
        delta: page
    });
}

function 开始下拉刷新() { 
    wx.startPullDownRefresh();
}

function 停止下拉刷新() { 
    wx.stopPullDownRefresh();
}

function 返回顶部() { 
    wx.pageScrollTo({scrollTop: 0,duration: 300});
}

function 滚动到指定组件(组件ID) {
  var query =  wx.createSelectorQuery();//创建节点查询器
  query.select("#"+组件ID).boundingClientRect();//选择id为comment的节点并查询的它布局位置
  query.exec(function(res) {//执行请求
      wx.pageScrollTo({
        scrollTop: res[0].top,//滚动到页面节点的上边界坐标
        duration: 300   // 滚动动画的时长
      });
    });
}

function 显示标题栏加载圈() { 
    wx.showNavigationBarLoading();
}

function 隐藏标题栏加载圈() { 
    wx.hideNavigationBarLoading();
}

function 置标题栏标题(value) { 
    wx.setNavigationBarTitle({title: value});
}

function 置标题栏颜色(front,back,anm) {
    if(anm==true){
        wx.setNavigationBarColor({
            frontColor: front,
            backgroundColor: back,
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            } 
        });
    }else{
        wx.setNavigationBarColor({
            frontColor: front,
            backgroundColor: back
        });    
    }
}

function 缩放动画效果() {
var pageArr = getCurrentPages();
let that=pageArr[pageArr.length-1];
 // 第1步：创建动画实例 
 var animation = wx.createAnimation({
  duration: 300, //动画时长 
  timingFunction: "linear", //线性 
  delay: 0 //0则不延迟 
 });
 // 第2步：这个动画实例赋给当前的动画实例 
 that.animation = animation;
 // 第3步：执行第一组动画 
 animation.opacity(0).rotateY(100).step();
 // 第4步：导出动画对象赋给数据对象储存 
 that.setData({
  animationData: animation.export() //将定义好的动画效果导出给view标签，wxml里的view标签要配置这个属性 animation="{{animationData}}"
 });
 // 第5步：设置定时器到指定时候后，执行第二组动画 
 setTimeout(function() {
    // 执行第二组动画 
    animation.opacity(1).rotateY(0).step();
    // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
    that.setData({
        animationData: animation.export() //将定义好的动画效果导出给view标签，wxml里的view标签要配置这个属性 animation="{{animationData}}"
    });
 }.bind(that), 200);//延迟200毫秒后执行关闭动画
}

function 显示面板(index,type) {
    if(type==5){
        showModal(index);
        return;
    }
    if(type==2){
        缩放动画效果();
    }
    var pageArr = getCurrentPages();
    var page = pageArr[pageArr.length-1];
    if(type==2){
        page.data.mb_freePanel[index]=true;
    }else{
        page.data.mb_freePanel[index]=false;
    }
	page.setData({
        mb_freePanel: page.data.mb_freePanel
    });
}

function 隐藏面板(index,type) {
    if(type==5){
        hideModal(index);
        return;
    }
    if(type==2){
        缩放动画效果();
    }
    let pageArr = getCurrentPages();
    let page = pageArr[pageArr.length-1];
    setTimeout(function() {
        if(type==2){
            page.data.mb_freePanel[index]=false;
        }else{
            page.data.mb_freePanel[index]=true;
        }
	    page.setData({
            mb_freePanel: page.data.mb_freePanel
        }); 
    }.bind(page), 200);//延迟200毫秒执行，等待关闭动画结束后再隐藏悬浮面板
}



  //显示底部弹出自由面板
  function showModal(index) {
    var pageArr = getCurrentPages();
    let that=pageArr[pageArr.length-1];
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    that.animation = animation;
    animation.translateY(300).step();
    that.data.mb_freePanel[index]=true;
    that.setData({
      animationData: animation.export(),
      mb_freePanel: that.data.mb_freePanel
    });
    setTimeout(function () {
      animation.translateY(0).step();
      that.setData({
        animationData: animation.export()
      });
    }.bind(that), 200);
  }
  
  //隐藏底部弹出自由面板
  function hideModal(index) {
    var pageArr = getCurrentPages();
    let that=pageArr[pageArr.length-1];
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    that.animation = animation;
    animation.translateY(300).step();
    that.data.mb_freePanel[index]=false;
    that.setData({
      animationData: animation.export(),
      mb_freePanel: that.data.mb_freePanel
    });
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      });
    }.bind(that), 200);
  }

module.exports = {切换窗口_非导航栏:切换窗口_非导航栏,      
切换窗口_重定向:切换窗口_重定向,
切换窗口_重启:切换窗口_重启,
切换窗口_导航栏:切换窗口_导航栏,
切换窗口_返回:切换窗口_返回,
开始下拉刷新:开始下拉刷新,
停止下拉刷新:停止下拉刷新,
返回顶部:返回顶部,
滚动到指定组件:滚动到指定组件,
显示标题栏加载圈:显示标题栏加载圈,
隐藏标题栏加载圈:隐藏标题栏加载圈,
置标题栏标题:置标题栏标题,
置标题栏颜色:置标题栏颜色,
缩放动画效果:缩放动画效果,
显示面板:显示面板,
隐藏面板:隐藏面板
};