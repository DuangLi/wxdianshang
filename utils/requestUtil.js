//定义请求根路径 
const baseUrl = "http://localhost:8080";

//同时异步请求数 
let ajaxTimes = 0;

/** 
 * 返回请求根路径 
 * @param {*} params  
 */

export const getBaseUrl = () => {
  return baseUrl;
}

/**  
 * wx login封装 
 */
export const getWxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 5000,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  });
}

/** 
 * wx getUserProfile封装 
 */
export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  });
}

/** 
 * 后端请求工具类 
 */
export const requestUtil = (params) => {

  // 判断url中是否带有 /my/ 请求的是私有的路径 带上header token 
  let header = { ...params.header };
  if (params.url.includes("/my/")) {
    // 拼接header 带上token 
    header["token"] = wx.getStorageSync('token')
  }

  //模拟网络延迟 
  let start = new Date().getTime();

  ajaxTimes++;
  wx.showLoading({
    title: '加载中',
    mask: true
  })

  while (true) {
    if (new Date().getTime() - start > 100) break;
  }


  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      header,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes == 0) {
          wx.hideLoading();
        }
      }
    })
  })
}