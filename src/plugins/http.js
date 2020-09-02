/*
 * @Author: your name
 * @Date: 2020-08-25 12:41:37
 * @LastEditTime: 2020-09-02 08:48:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mgt_sys\backmanager\src\plugins\http.js
 */
// 插件模块
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  // 添加实例方法
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

  //在请求发起之前 会先来到下面的回调函数 
  // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
      // console.log("拦截器被触发")

      // console.log(config.url)
      // 在发送请求之前做些什么
      if(config.url!=='login'){
        const AUTH_TOKEN = localStorage.getItem('token')
        config.headers['Authorization'] = AUTH_TOKEN;
      }
    
  
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });

    //除了登录之外，都需要设重头部




    //在请求发起之前 设置头部

    
    
    //添加实例方法
    Vue.prototype.$http = axios
}

export default MyHttpServer


