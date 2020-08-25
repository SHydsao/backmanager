/*
 * @Author: your name
 * @Date: 2020-08-25 12:41:37
 * @LastEditTime: 2020-08-25 12:53:26
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
  Vue.prototype.$http = axios
}

export default MyHttpServer
