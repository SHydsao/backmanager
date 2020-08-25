/*
 * @Author: your name
 * @Date: 2020-08-25 10:40:57
 * @LastEditTime: 2020-08-25 11:09:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mgt_sys\backmanager\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render:(h)=>h(App)
  components: { App },
  template: '<App/>'
})