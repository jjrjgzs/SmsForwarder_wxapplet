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
    // 标签标题
    value: {           
      type: String,     
      value: ''     
    },
    //style扩展样式
    mb_style_extra: {            // 属性名
      type: String,     // 类型，
      value: ''     // 属性初始值
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
    置标题(txt) {
      this.setData({
        value: txt
      })
    },
    
    取标题() {
      return this.data.value
    },

    置颜色(color_back, color_txt) {
      this.setData({
        mb_style_extra: "display:block;width:auto;background-color:"+color_back+";color:"+color_txt
      })
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
