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
    productList: [],
    inputValue: '',
    isFocus: false
  },

  timeoutId: -1,

  /** 
  * 点击事件 处理输入框变更 
  */
  handleInput(e) {
    const { value } = e.detail;
    console.log(value);
    if (!value.trim()) { //字符串为空 
      this.setData({
        productList: [],
        isFocus: false
      })
      return;
    }
    this.setData({
      isFocus: true
    })

    //搜索框停止输入一秒后开始检索 
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.search(value);
    }, 1000)


  },

  /** 
   * 点击事件 清空搜索框 
   */
  handleCancle() {
    this.setData({
      productList: [],
      inputValue: '',
      isFocus: false
    })
  },

  /** 
   * 商品搜索 
   */
  async search(q) {
    const result = await requestUtil({
      url: '/product/search',
      data: { q },
      method: "GET"
    });
    console.log(result.message);
    this.setData({
      productList: result.message,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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