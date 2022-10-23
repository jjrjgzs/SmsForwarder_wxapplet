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
    bot: {    // 属性名：底部距离
      type: String,     // 类型
      value: '50px'     // 属性初始值
    },    
    rig: {   // 属性名：右侧距离
      type: String,     // 类型
      value: '50px'     // 属性初始值
    },
    wid: {   // 属性名：按钮宽度
      type: String,     // 类型
      value: '80rpx'     // 属性初始值
    },   
    hei: {   // 属性名：按钮高度
      type: String,     // 类型
      value: '80rpx'     // 属性初始值
    },
    color: {   // 属性名：边框颜色
      type: String,     // 类型
      value: '#1296DB'     // 属性初始值
    },
    path: {   // 属性名：图标
      type: String,     // 类型
      value: ''     // 属性初始值
    }		                      
  },

  /*
   * 组件的初始数据
   */
  data: {
    
  },
  
  /*
   * 组件的方法列表
   */
  methods: {   
    置可视(value) {
        this.setData({
	    show: value
	})
    },
    
   /*
    * 组件的事件，事件函数名称请用英文，与wxml里的事件函数名称保持一致
    * triggerEvent 用于触发事件，参数一：事件函数名称(必填)，  参数二：要传递的参数，json对象格式(可选)
    */
    _onTap() {
        this.triggerEvent("onTap");//触发‘被单击’事件
    }

  }
})
