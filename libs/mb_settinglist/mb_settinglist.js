Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }, 
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示
    show: {            // 属性名
      type: Boolean,     // 类型
      value: 'true'     // 属性初始值，true,false
    },
    switchColor:{            // 属性名
      type: String,     // 类型
      value: '#04BE02'     // 属性初始值   
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
    添加项目(图片,标题,显示宽线,显示开关,开关状态,标记) {
      var value = {
        "path": 图片,
        "title":标题,
        "wide":显示宽线,
        "switch":显示开关,
        "check":开关状态,
        "tag": 标记
      };
      this.data.items.push(value);
      this.setData({
        items: this.data.items
      });      
    },

    删除项目(index) {
      this.data.items.splice(index,1);  
      this.setData({
        items: this.data.items
      });
    },
    
    清空项目() {
      this.setData({
        items: []
      });
    },

    取项目图片(index) {
      return this.data.items[index].path;
    },

    置项目图片(index,value) {
      this.data.items[index].path = value;
      this.setData({
        items: this.data.items
      });      
    },

    取项目标题(index) {
      return this.data.items[index].title;
    },

    置项目标题(index,value) {
      this.data.items[index].title = value;
      this.setData({
        items: this.data.items
      });      
    },

    取项目标记(index) {
      return this.data.items[index].tag;
    },

    置项目标记(index,value) {
      this.data.items[index].tag = value;
      this.setData({
        items: this.data.items
      });      
    },

    取开关状态(index) {
      return this.data.items[index].check;
    },

    置开关状态(index,value) {
      this.data.items[index].check = value;
      this.setData({
        items: this.data.items
      });      
    },
    
    取项目总数() {
      return this.data.items.length;
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
    // 表项被单击
    _optionTap(e) {
        var Index = e.currentTarget.dataset.index;//获取点击的项目的索引
        this.triggerEvent("optionTap",{"项目索引":Index});//触发‘表项被单击’事件
    },    
    // 开关被单击
    _switchChange(e) {
        var Index = e.currentTarget.dataset.index;//获取点击的项目的索引
        this.data.items[Index].check = e.detail.value;
        this.triggerEvent("switchChange",{"项目索引":Index,"开关状态":e.detail.value});//触发‘开关被单击’事件
    }  
  }
})
