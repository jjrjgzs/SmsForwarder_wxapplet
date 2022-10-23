
    function 对话框(event1,event2){  
        
        this.信息框 = function (mytitle,msg){        
            wx.showModal({
              title: mytitle,
              content: msg,
              showCancel:false,
              success (res) {
                if(event1!=null){
                    event1();
                }
              },
              fail(res){
                console.log(res.errMsg);
                if(event1!=null){
                    event1();
                }                
              }
            });
        }
        
        this.询问框 = function (mytitle,msg,ok,no){
            wx.showModal({
              title: mytitle,
              content: msg,
              confirmText:ok,
              cancelText:no,
              showCancel:true,
              success (res) {
                if(event2!=null){
                    if (res.confirm) {
                        event2(0);
                    }else{
                        event2(1);
                    }
                }
              },
              fail(res){
                console.log(res.errMsg);
                if(event2!=null){
                    event2(1);
                }                
              }
            });
        }
        
        this.弹出提示 = function (msg){        
            wx.showToast({
              title: msg,
              icon: 'none',
              duration: 2000
            });           
        } 

        this.弹出提示2 = function (msg){        
            wx.showToast({
              title: msg,
              icon: 'success',
              duration: 2000
            });                
        } 

        this.显示等待框 = function (msg){
            wx.showLoading({
              title: msg,
            });        
        } 
        
        this.关闭等待框 = function (){
            wx.hideLoading();
        }         
        
    }  
    module.exports = {对话框:对话框};//一定要在最底部加上这个，表示要导出的函数名称