Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }, 
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示
    show: { 
      type: Boolean, 
      value: 'true' 
    },
    //style样式
    mb_style: { 
      type: String,     
      value: ''     
    },
    //选框颜色
    radioColor: { 
      type: String,     
      value: '#09BB07'     
    } ,
    //排列方向
    radioDirection:{
      type: String,
      value: 'block'      
    }        
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*
     * 公有方法
     */
    添加(a,b,c) {
        var item = { name: a, value: b, checked: c}
        this.data.items.push(item)
    },
    
    添加完毕() {
      this.setData({
        items: this.data.items
      })
    },

    清空() {
      this.setData({
        items: []
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
    _onChange(e) {
      //触发'选中项被改变'事件回调
      this.triggerEvent("onChange",{"名称":e.detail.value})
    }    
    
  }
})
