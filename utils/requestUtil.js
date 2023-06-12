//定义请求根路径
const baseUrl = "http://localhost:8080";

/**
 * 返回请求根路径
 * @param {*} params 
 */

export const getBaseUrl=()=>{
  return baseUrl;
}

/**
 * 后端请求工具类
 * @param {*} params 
 */
export const requestUtil = (params)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result.data);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}