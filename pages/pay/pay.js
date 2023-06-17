import { 
  requestUtil, 
  getBaseUrl 
} from "../../utils/requestUtil"; 
import regeneratorRuntime from "../../lib/runtime/runtime"; 
 
// pages/gouwuche/gouwuche.js 
Page({ 
 
  /** 
   * 页面的初始数据 
   */ 
  data: { 
    baseUrl: '', 
    address: {}, 
    cart: [], 
    totalPrice: 0, 
    totalNum: 0, 
 
  }, 
 
  /** 
   * 生命周期函数--监听页面加载 
   */ 
  onLoad(options) { 
    const baseUrl = getBaseUrl(); 
    this.setData({ 
      baseUrl 
    }); 
  }, 
 
  /** 
   * 点击事件，模拟微信支付成功 
   */ 
  handlePay() { 
    wx.showModal({ 
      title: '提示', 
      content: '确认支付', 
      success: (res) => { 
        if (res.confirm) { 
          const cart = wx.getStorageSync('cart'); 
          let newCart = []; 
          cart.forEach(v => { 
            if (!v.checked) { 
              newCart.push(v); 
            } 
          }) 
          wx.setStorageSync('cart', newCart); 
          wx.navigateTo({ 
            url: '../order/order', 
          }) 
        } 
      } 
    }) 
  }, 
 
  /** 
   * 生命周期函数--监听页面显示 
   */ 
  onShow() { 
    const address = wx.getStorageSync('address'); 
    let cart = wx.getStorageSync('cart'); 
    cart = cart.filter(v => v.checked); 
    this.setData({ 
      address 
    }) 
    this.setCart(cart); 
  }, 
 
  /** 
   * 计算购物车底部工具栏数据 全选 总价 总数量 更新缓存 
   */ 
  setCart(cart) { 
    let totalPrice = 0; 
    let totalNum = 0; 
    cart.forEach(v => { //遍历清单每一个项目 
      if (v.checked) { 
        totalNum += v.num; 
        totalPrice += v.price * v.num; 
      } 
    }) 
    this.setData({ 
      cart, 
      totalNum, 
      totalPrice, 
    }) 
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