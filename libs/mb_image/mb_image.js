Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }, 
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示
    show: { 
      type: Boolean, 
      value: 'true' 
    },  
    // 图片地址
    path: {           
      type: String,     
      value: ''     
    },
    //style样式
    mb_style: {
      type: String, 
      value: '' 
    },
    //缩放模式
    mb_mode:{
      type: String, 
      value: 'scaleToFill'     
    }      
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*
     * 公有方法
     */
    置图片(txt) {
      this.setData({
        path: txt
      })
    },
    
    取图片() {
      return this.data.path
    },
    
    置可视(value) {
        this.setData({
          show: value
        })
    },

    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件，参数一：事件名称，必填  参数二：要传递的参数，json对象格式，可选
    */
    _onClick() {
      //触发被单击回调
      this.triggerEvent("onClick")
    }
    
  }
})
