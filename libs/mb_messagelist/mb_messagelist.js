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
    imageWidth: {            // 属性名
      type: String,     // 类型
      value: '100rpx'     // 属性初始值
    },    
    imageHeight: {            // 属性名
      type: String,     // 类型
      value: '100rpx'     // 属性初始值
    },
    borderRadius:{
      type: String,     // 类型
      value: '0px'     // 属性初始值    
    },    
    wrapType:{
      type: String,     // 类型
      value: 'nowrap'     // 属性初始值      
    },
    border: { // 是否显示边框
        type: Boolean,
        value: true
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
    添加项目(图片,标题,信息,时间,角标,标记) {
      var value = {
        "path": 图片,
        "title":标题,
        "message": 信息,
        "time":时间,
        "count":角标,
        "tag": 标记
      };
      this.data.items.push(value);
      this.setData({
        items: this.data.items
      });      
    },

    删除项目(value) {
      this.data.items.splice(value,1);  
      this.setData({
        items: this.data.items
      });
    },
    
    清空项目() {
      this.setData({
        items: []
      });
    },

    取项目图片(value) {
      return this.data.items[value].path;
    },

    置项目图片(index,value) {
      this.data.items[index].path=value;
      this.setData({
        items: this.data.items
      });      
    },

    取项目标题(value) {
      return this.data.items[value].title;
    },

    置项目标题(index,value) {
      this.data.items[index].title=value;
      this.setData({
        items: this.data.items
      });      
    },

    取项目信息(value) {
      return this.data.items[value].message;
    },

    置项目信息(index,value) {
      this.data.items[index].message=value;
      this.setData({
        items: this.data.items
      });      
    },

    取项目时间(value) {
      return this.data.items[value].time;
    },

    置项目时间(index,value) {
      this.data.items[index].time=value;
      this.setData({
        items: this.data.items
      });      
    },

    取项目角标(value) {
      return this.data.items[value].count;
    },

    置项目角标(index,value) {
      this.data.items[index].count=value;
      this.setData({
        items: this.data.items
      });      
    },

    取项目标记(value) {
      return this.data.items[value].tag;
    },

    置项目标记(index,value) {
      this.data.items[index].tag=value;
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
    // 点击表项
    _optionTap(e) {
        var Index = e.currentTarget.dataset.index;//获取点击的项目的索引
        this.triggerEvent("optionTap",{"项目索引":Index});//触发‘表项被单击’事件
    }    

  }
})
