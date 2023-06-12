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
    swiperList: [],
    baseUrl: "",
    bigTypeList: [],
    bigTypeListRow1: [],
    bigTypeListRow2: [],
    hotProductList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    });
    this.getSwiperList();
    this.getBigTypeList();
    this.getHotProductList();
  },

  /**
   *首页点击大类跳转商品分类界面事件 
   */
  handleTypeJump(e) {
    const index = e.currentTarget.dataset.index;
    const app = getApp();
    app.globalData.index = index;
    wx.switchTab({
      url: '/pages/fenlei/fenlei',
    })
  },

  /**
   * 获取轮播图片
   */
  async getSwiperList() {
    const result = await requestUtil({
      url: '/product/findSwiper',
      method: "GET"
    });
    this.setData({
      swiperList: result.message,
    })
  },

  /**
   * 获取畅销商品列表
   */
  async getHotProductList() {
    const result = await requestUtil({
      url: '/product/findHot',
      method: "GET"
    });
    this.setData({
      hotProductList: result.message,
    })
  },

  /**
   * 获取商品大类
   */
  async getBigTypeList() {
    const result = await requestUtil({
      url: '/bigType/findAll',
      method: "GET"
    });
    const bigTypeList = result.message;
    const bigTypeListRow1 = bigTypeList.filter((item, index) => {
      return index < 5;
    });
    const bigTypeListRow2 = bigTypeList.filter((item, index) => {
      return index >= 5;
    });
    this.setData({
      bigTypeList,
      bigTypeListRow1,
      bigTypeListRow2,
    })
  }
})