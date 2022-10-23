Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }, 
  /**
   * 组件的属性列表
   */
  properties: {
    // 编辑框样式
    type: {             // 属性名称
      type: String,     // 属性类型
      value: 'text'     // 属性初始值
    },  
    // 是否密码输入
    password: {  
      type: Boolean, 
      value: 'false' 
    },  
    // 是否显示
    show: { 
      type: Boolean, 
      value: 'true' 
    },       
    //style样式
    mb_style: { 
      type: String,     
      value: ''     
    },    
    // 提示内容
    placeholder: {
      type: String,     
      value: ''    
    },
    // 编辑框内容
    value: {           
      type: String,     
      value: ''     
    },    
    // 完成键名称
    confirmtype: {          
      type: String,     
      value: 'done'     
    },
    //只读模式
    readOnly:{
       type: Boolean, 
       value: 'false'    
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
    置内容(txt) {
      this.setData({
        value: txt
      });
    },
    
    取内容() {
      return this.data.value;
    },
    
    置提示内容(txt) {
      this.setData({
        placeholder: txt
      });
    },    
    
    取提示内容() {
      return this.data.placeholder
    },    

    置只读模式(value) {
        this.setData({
          readOnly: value
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
    _onInput(e) {
      //触发'按下某键'事件回调
      //console.log(e);
      this.setData({
        value: e.detail.value
      });      
      this.triggerEvent("onInput",{"键代码":e.detail.keyCode});
    },
    
    _onFocus() {
      //触发'获得焦点'事件回调
      this.triggerEvent("onFocus")
    },    

    _onBlur() {
      //触发'失去焦点'事件回调
      this.triggerEvent("onBlur")
    },  

    _onConfirm() {
      //触发'按下完成键'事件回调
      this.triggerEvent("onConfirm")
    }      
  }
})
