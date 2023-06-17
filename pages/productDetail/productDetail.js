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
    productObj: {}
  },

  productInfo: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    });
    this.getProductDetail(options.id);
  },

  /**
   * 获取商品详情轮播图列表
   */
  async getProductDetail(id) {
    const result = await requestUtil({
      url: '/product/detail',
      data: { id },
      method: "GET"
    });
    this.productInfo = result.message;
    this.setData({
      productObj: result.message,
    })
  },

  /** 
   * 点击事件，商品添加到购物车 
   */
  handleCartAdd() {
    this.setCartAdd();

    wx.showToast({
      title: '添加成功',
      mask: true,
      icon: 'success'
    })
  },

  /** 
   * 点击事件，立即购买商品 
   */
  handleBuy() {
    this.setCartAdd();

    wx.switchTab({
      url: '../gouwuche/gouwuche',
    })
  },

  /** 
   * 处理商品添加到购物车逻辑 
   */
  setCartAdd() {
    let cart = wx.getStorageSync('cart') || [];
    console.log(cart);
    let index = cart.findIndex(v => v.id === this.productInfo.id);
    if (index === -1) { //未查询到，商品不存在 
      this.productInfo.num = 1;
      this.productInfo.checked = true;
      cart.push(this.productInfo);
    } else { //商品已在购物车中 
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
  },















  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})