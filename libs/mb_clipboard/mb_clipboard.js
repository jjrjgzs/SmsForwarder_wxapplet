function 剪贴板(onSuccess,onFail){  //onLoop是英文事件名称，如果有多个事件，可以用逗号分开，举例：function 剪贴板(event1,event2,event3){ 

    //类库命令
    this.置剪贴板内容 = function (txt){
		wx.setClipboardData({
  			data: txt,
  			success (res) {
				//console.log(res.data)
  			},
  			fail (res) {
				
  			}			
		})
    }
    
    //类库命令
    this.取剪贴板内容 = function (){
    	wx.getClipboardData({
      		success (res) {
        		//console.log(res.data)
				if(onSuccess!=null){
					onSuccess(res.data)//调用取剪贴板成功事件
				}
      		},
  			fail (res) {
				if(onFail!=null){
					onFail()//调用取剪贴板失败事件
				}
  			}			
    	})           
    }
    
}
module.exports = {剪贴板:剪贴板};//注意：一定要在最底部加上这个，表示要导出的函数名称，只需导出类库名称的函数即可

