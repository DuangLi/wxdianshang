import {
  requestUtil,
  getBaseUrl
} from "../../utils/requestUtil";
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: "",
    currentIndex: 0,
    scrollTop: 0,//纵向滚动条置顶
    leftMenuList: [],//左侧菜单分类数据
    rightContentList: [],//右侧商品小类内容数据

  },

  Cates: [],//所有商品数据

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    });
    this.getCates();
  },

  /**
   * 获取商品分类
   */
  async getCates() {
    const result = await requestUtil({
      url: '/bigType/findCategories',
      method: "GET"
    });
    this.Cates = result.message;
    let leftMenuList = this.Cates.map(v => {
      return v.name;
    })
    let rightContentList = this.Cates[0].smallTypeList;

    this.setData({
      leftMenuList,
      rightContentList,
    })
  },

  /**
   * 获取从首页跳转来的商品分类 携带参数index
   */
  async getCates2(index) {
    const result = await requestUtil({
      url: '/bigType/findCategories',
      method: "GET"
    });
    this.Cates = result.message;
    let leftMenuList = this.Cates.map(v => {
      return v.name;
    })
    let rightContentList = this.Cates[index].smallTypeList;

    this.setData({
      leftMenuList,
      rightContentList,
      currentIndex: index,
      scrollTop: 0
    })
  },

  /**
   * 左侧菜单栏点击切换事件
   */
  handleMenuItemChange(e) {
    const index = e.currentTarget.dataset.index;
    let rightContentList = this.Cates[index].smallTypeList;
    this.setData({
      currentIndex: index,
      rightContentList,
      scrollTop: 0
    })
  },

  onShow: function () {
    const app = getApp();
    const index = app.globalData.index;

    if (index != -1) { //index不为-1表示从首页跳转过来
      this.getCates2(index);
      app.globalData.index = -1
    } else { //从tabBar点击跳转过来时默认显示文学，不加这段会保留上次跳转的index
      this.setData({
        currentIndex: 0
      })
    }
  }
})