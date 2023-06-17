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
    allChecked: false,
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
   * 点击事件，选择收货地址 
   */
  handleChooseAddress() {
    wx.chooseAddress({
      success: (result) => {
        console.log(result);
        wx.setStorageSync('address', result);
      }
    })
  },

  /** 
   * 点击事件，减少购物车商品数量 
   */
  editNumDown(e) {
    const index = e.currentTarget.dataset.index;
    const cart = wx.getStorageSync('cart');
    if (cart[index].num === 1) {
      wx.showModal({
        title: '提示',
        content: '您是否要删除该商品',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1);
            this.setCart(cart);
          }
        }
      })
    } else {
      cart[index].num--;
    }
    this.setCart(cart);
  },

  /** 
   * 点击事件，跳转订单支付界面 
   */
  handlePay() {
    const { address, totalNum } = this.data;
    if (!address) {
      wx.showToast({
        title: '您还未选择收货地址',
        icon: 'none'
      })
      return;
    }
    if (!totalNum) {
      wx.showToast({
        title: '您还未选购商品',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../pay/pay',
    })
  },

  /** 
   * 点击事件，增加购物车商品数量 
   */
  editNumUp(e) {
    const index = e.currentTarget.dataset.index;
    const cart = wx.getStorageSync('cart');
    cart[index].num++;
    this.setCart(cart);
  },

  /** 
   * 生命周期函数--监听页面初次渲染完成 
   */
  onReady() { },

  /**
   * 点击事件，选中/取消选中商品复选框 
   */
  handleItemChange(e) {
    const index = e.currentTarget.dataset.index;
    const cart = wx.getStorageSync('cart');
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  /** 
   * 点击事件，控制全选按钮的选中/取消选中 
   */
  handleSelectAll(e) {
    let allChecked = this.data.allChecked;
    let cart = wx.getStorageSync('cart');
    cart.forEach(v => {
      if (allChecked) { //全不选 
        v.checked = false;
      }
      else {
        v.checked = true;
      }
    })
    allChecked = !allChecked;
    this.setData({
      allChecked
    })
    this.setCart(cart);
  },

  /** 
   * 生命周期函数--监听页面显示 
   */
  onShow() {
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart');
    this.setData({
      address
    })
    this.setCart(cart);
  },

  /** 
   * 计算购物车底部工具栏数据 全选 总价 总数量 更新缓存 
   */
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => { //遍历清单每一个项目 
      if (v.checked) {
        totalNum += v.num;
        totalPrice += v.price * v.num;
      } else {
        allChecked = false;
      }
    })
    allChecked = cart.length !== 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice,
    })
    wx.setStorageSync('cart', cart);
  }
})