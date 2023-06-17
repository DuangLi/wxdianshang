// components/Tabs/Tabs.js 
Component({
  /** 
   * 组件的属性列表 
   */
  properties: {
    tabs: Array,
    value: []
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
    handleTabItemChange(e) {
      const { index } = e.currentTarget.dataset;
      //触发父组件方法 
      this.triggerEvent("tabChange", { index });
    }

  }
}) 