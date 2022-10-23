
    function 导航栏(){  
        
        this.显示小红点 = function (id){
            wx.showTabBarRedDot({index:id});
        }         

        this.隐藏小红点 = function (id){
            wx.hideTabBarRedDot({index:id});
        }   

        this.显示角标 = function (id,txt){
            wx.setTabBarBadge({index:id,text:txt});
        }   

        this.隐藏角标 = function (id){
            wx.removeTabBarBadge({index:id});
        }   

        this.设置风格 = function (clo,sel,bac,bor){
            wx.setTabBarStyle({
              color: clo,
              selectedColor: sel,
              backgroundColor: bac,
              borderStyle:bor
            });            
        }   

        this.设置项目 = function (id,txt,ico,sel){
            wx.setTabBarItem({
              index: id,
              text: txt,
              iconPath:ico,
              selectedIconPath: sel
            });
        }  

        this.显示导航栏 = function (value){
            wx.showTabBar({animation:value});
        }         

        this.隐藏导航栏 = function (value){
            wx.hideTabBar({animation:value});
        }   
        
    }  
    module.exports = {导航栏:导航栏};//一定要在最底部加上这个，表示要导出的函数名称