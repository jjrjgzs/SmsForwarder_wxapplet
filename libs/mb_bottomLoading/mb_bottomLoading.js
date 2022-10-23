//注意：整个组件的代码是一个json格式的数据，请注意保持这个格式，注意添加逗号，以下内容可自行修改
Component({

  /*
   * 组件的配置信息
   */
  options: {
    multipleSlots: true
  }, 
  
  /*
   * 组件的属性列表
   */
  properties: {
             
  },

  /*
   * 组件的初始数据
   */
  data: {
    showloading:false,
	isloading:false,
	loadingTxt:"",
	finishTxt:""
  },
  
  /*
   * 组件的方法列表
   */
  methods: {
    显示加载条(mode,txt) {
      this.setData({
        showloading: true,
		isloading:mode,
      });
	  if(mode){
	  	this.setData({
	  		loadingTxt:txt
		});
	  }else{
	  	this.setData({
	  		finishTxt:txt
		});
	  }      
    },

    隐藏加载条() {
      this.setData({
        showloading: false,
		isloading:false
      });
    }
    
	
  }
})
