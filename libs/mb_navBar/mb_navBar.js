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
    show: {            // 属性名：可视
      type: Boolean,     // 类型，目前支持以下类型(首字母需大写)：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 'true'     // 属性初始值
    },
    backColor: {    // 属性名：背景颜色
      type: String,     // 类型
      value: '#FFFFFF'     // 属性初始值
    },    
    activeColor: {   // 属性名：激活颜色
      type: String,     // 类型
      value: '#007AFF'     // 属性初始值
    },
	fontSize:{   // 属性名：字体大小
	  type: String,   // 类型
	   value: '32rpx'     // 属性初始值
	}                    
  },

  /*
   * 组件的初始数据
   */
  data: {
    navbarItems: [], 
    currentTab: 0
  },
  
  /*
   * 组件的方法列表
   */
  methods: {
    添加项目(title) {
      this.data.navbarItems.push(title);
      this.setData({
        navbarItems: this.data.navbarItems
      });
    },

    删除项目(index) {
      this.data.navbarItems.splice(index,1);  
      this.setData({
        navbarItems: this.data.navbarItems
      });
    },
    
    清空项目() {
      this.setData({
        navbarItems: []
      });
    },

    设置项目(items) {
      this.setData({
        navbarItems: items
      });
    },

    取项目标题(index) {
      return this.data.navbarItems[index];
    },

    置项目标题(index,value) {
      this.data.navbarItems[index]=value;
      this.setData({
        navbarItems: this.data.navbarItems
      });      
    },
  
    取项目总数() {
      return this.data.navbarItems.length;
    },

    选中项目(index) {
      this.setData({
        currentTab: index
      });      
    },
    
    置可视(value) {
        this.setData({
	    	show: value
		})
    },
    
   /*
    * 组件的事件，事件函数名称请用英文，与wxml里的事件函数名称保持一致
    * triggerEvent 用于触发事件，参数一：事件函数名称(必填)，  参数二：要传递的参数，json对象格式(可选)
    */   
    _navbarTap: function(e){
		var a = e.currentTarget.dataset.idx
        this.setData({ 
            currentTab: e.currentTarget.dataset.idx 
        });
		this.triggerEvent("navbarTap",{"项目索引":a});//触发‘项目被单击’事件，并将被单击的项目索引传递过去 
    } 



  }
})
