import { requestUtil } from "../../utils/requestUtil"; 
 
// pages/order/order.js 
Page({ 
 
  /** 
   * 页面的初始数据 
   */ 
  data: { 
    orders: [], 
    tabs: [{ 
      id: 0, 
      value: '全部订单', 
      isActive: true 
    }, { 
      id: 1, 
      value: '待付款', 
      isActive: false 
    }, { 
      id: 2, 
      value: '待收货', 
      isActive: false 
    }, { 
      id: 3, 
      value: '退款/退货', 
      isActive: false 
    }] 
  }, 
 
  // 后端接口参数 
  QueryParams: { 
    type: 0, 
    page: 1, 
    pageSize: 10 
  }, 
 
  //总页数 
  totalPage: 1, 
 
  /** 
   * 点击切换订单顶部tab栏 
   */ 
  handleIndexChange(index) { 
    let tabs = this.data.tabs; 
    tabs.forEach(v => { 
      if (v.id == index) { 
        v.isActive = true; 
      } 
      else { 
        v.isActive = false; 
      } 
    }) 
 
    this.setData({ 
      tabs 
    }) 
  }, 
 
 
  /** 
   * 生命周期函数--监听页面加载 
   */ 
  onLoad(options) { 
    this.getOrders(); 
  }, 
 
  /** 
   * 切换顶部tab栏 
   */ 
  handleTabChange(e) { 
    let { index } = e.detail; 
    //获取index并切换 
    this.handleIndexChange(index); 
 
    //获取当前订单列表 
    this.QueryParams.type = index; 
    this.QueryParams.page = 1; 
    this.setData({ 
      orders: [] 
    }) 
    this.getOrders(); 
  }, 
 
  async getOrders() { 
    const res = await requestUtil({ url: '/my/order/list', data: this.QueryParams }); 
    this.totalPage = res.totalPage; 
    this.setData({ 
      orders: [...this.data.orders, ...res.orderList] //将先前数据和当前页拼接 
    }) 
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
    console.log("show"); 
    let pages = getCurrentPages(); 
    let currentPage = pages[pages.length - 1]; //获取小程序当前界面 
    console.log(currentPage.options); 
    let { type } = currentPage.options; 
    this.handleIndexChange(type); 
    this.QueryParams.type = type; 
    this.QueryParams.page = 1; 
    this.setData({ 
      orders: [] 
    }) 
    this.getOrders(); 
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
    this.QueryParams.page = 1; 
    this.setData({ 
      orders: [] 
    }) 
    this.getOrders(); 
    wx.stopPullDownRefresh(); 
  }, 
 
  /** 
   * 页面上拉触底事件的处理函数 
   */ 
  onReachBottom() { 
    console.log("触底"); 
    if (this.QueryParams.page >= this.totalPage) { //已经是最后一页 
      console.log("没有下一页数据"); 
      wx.showToast({ 
        title: '到底了~', 
        icon: 'none' 
      }) 
    } 
    else { 
      this.QueryParams.page++; 
      this.getOrders(); 
    } 
  }, 
 
  /** 
   * 用户点击右上角分享 
   */ 
  onShareAppMessage() { 
 
  } 
})