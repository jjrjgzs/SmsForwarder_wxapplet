
    function 菜单(event1,event2){
        this.caidan = [];
        this.tag = [];

        this.置标记 = function (value){
            this.tag= value;
        }
        
        this.显示菜单 = function (menus){
            this.caidan = menus;
            wx.showActionSheet({
              itemList: menus,
              success (res) {
                if(event1!=null){
                    event1(res.tapIndex);
                }
              },
              fail (res) {
                console.log(res.errMsg);
                if(event2!=null){
                    //if(res.errMsg=="showActionSheet:fail cancel"){
                        event2();
                    //}
                }
              }
            });
        }
        
        this.取标题 = function (index){  
            return this.caidan[index];
        }
        
        this.取标记 = function (index){  
            return this.tag[index];
        }       
    }  
    module.exports = {菜单:菜单};//一定要在最底部加上这个，表示要导出的函数名称