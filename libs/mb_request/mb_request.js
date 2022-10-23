function 网络操作(requestdata){  //括号里的是英文事件名称，如果有多个事件，可以用逗号分开，举例：function 网络操作(event1,event2,event3){ 
	this.请求头 = {"content-type": "application/json"};
	this.返回格式 = "json";
	this.数据类型 = "text";

	this.发起请求 = function (wurl,wdata,wet){
        wx.request({
			url: wurl,
			data: wdata,
			header: this.请求头,
			method: wet,
			dataType: this.返回格式,
			responseType: this.数据类型,
			success (res) {
				requestdata(0,res.data);
			},
			fail(res){
				requestdata(1,res.errMsg);
			}
		})
    }

    this.置请求头 = function (value){
        this.请求头 = value;
    }

    this.置返回格式 = function (value){
        this.返回格式 = value;
    }

    this.置数据类型 = function (value){
        this.数据类型 = value;
    }

    this.URL编码 = function (value){
        return encodeURIComponent(value);
    }

    this.URL解码 = function (value){
        return decodeURIComponent(value);
    }
    
}
module.exports = {网络操作:网络操作};//注意：一定要在最底部加上这个，表示要导出的函数名称，只需导出类库名称的函数即可

