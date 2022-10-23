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
        show: {            // 属性名
            type: Boolean,     // 类型，目前支持以下类型(首字母需大写)：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: 'true'     // 属性初始值
        }              
    },

    /*
    * 组件的初始数据
    */
    data: {
        items: [] //表项的数据
    },
  
    /*
    * 组件的方法列表
    */
    methods: {
		添加项目(图片框1地址,标签1标题,标签2标题,标签3标题,图片框2地址,标签4标题,项目标记){
			var value = {
				"image1":图片框1地址,
				"text1":标签1标题,
				"text2":标签2标题,
				"text3":标签3标题,
				"image2":图片框2地址,
				"text4":标签4标题,
				"tag":项目标记
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

		取图片框1地址(index) {
			return this.data.items[index].image1;
		},

		置图片框1地址(index,value) {
			this.data.items[index].image1=value;
			this.setData({
				items: this.data.items
			});
		},

		取标签1标题(index) {
			return this.data.items[index].text1;
		},

		置标签1标题(index,value) {
			this.data.items[index].text1=value;
			this.setData({
				items: this.data.items
			});
		},

		取标签2标题(index) {
			return this.data.items[index].text2;
		},

		置标签2标题(index,value) {
			this.data.items[index].text2=value;
			this.setData({
				items: this.data.items
			});
		},

		取标签3标题(index) {
			return this.data.items[index].text3;
		},

		置标签3标题(index,value) {
			this.data.items[index].text3=value;
			this.setData({
				items: this.data.items
			});
		},

		取图片框2地址(index) {
			return this.data.items[index].image2;
		},

		置图片框2地址(index,value) {
			this.data.items[index].image2=value;
			this.setData({
				items: this.data.items
			});
		},

		取标签4标题(index) {
			return this.data.items[index].text4;
		},

		置标签4标题(index,value) {
			this.data.items[index].text4=value;
			this.setData({
				items: this.data.items
			});
		},

        取项目标记(index) {
            return this.data.items[index].tag;
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
            });
        },
        
       /*
        * 组件的事件，事件函数名称请用英文，与wxml里的事件函数名称保持一致
        * triggerEvent 用于触发事件，参数一：事件函数名称(必填)，  参数二：要传递的参数，json对象格式(可选)
        */
        onItemTap(e) {
            var a = e.currentTarget.dataset.index;//获取点击的项目的索引
            this.triggerEvent("onItemTap",{"项目索引":a});//触发‘项目被单击’事件，并将被单击的项目索引传递过去
        }

	}
})