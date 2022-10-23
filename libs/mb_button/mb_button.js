Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }, 
  /**
   * 组件的属性列表
   */
  properties: {
  
    // 按钮标题
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '按钮'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    
    // 按钮样式
    type: {            // 属性名
      type: String,     // 类型，
      value: 'default'     // 属性初始值，default,primary,warn
    },  

    // 开放能力
    opentype: {            // 属性名
      type: String,     // 类型，
      value: ''     // 属性初始值
    },  
    
    // 是否显示
    show: {            // 属性名
      type: Boolean,     // 类型
      value: 'true'     // 属性初始值，true,false
    },   
    
    // 是否镂空
    plain: {            // 属性名
      type: Boolean,     // 类型
      value: 'false'     // 属性初始值，true,false
    },
    
    //style样式
    mb_style: {            // 属性名
      type: String,     // 类型，
      value: ''     // 属性初始值
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
        title: txt
      })
    },
    
    取标题() {
      return this.data.title
    },

    置颜色(color_back, color_txt) {
      this.setData({
        mb_style_extra: "background-color:"+color_back+";color:"+color_txt
      })
    },

    置镂空(value) {
      this.setData({
        plain: value
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
    },
    
    _getPhoneNumber(e){
        //console.log(e.detail.code)
        this.triggerEvent("getPhoneNumber",{"code":e.detail.code})
    },
    
    _chooseAvatar(e){
        //console.log(e.detail.avatarUrl)
        this.triggerEvent("chooseAvatar",{"avatarUrl":e.detail.avatarUrl})
    }    
    
  }
})
