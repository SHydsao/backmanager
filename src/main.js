/*
 * @Author: your name
 * @Date: 2020-08-25 10:40:57
 * @LastEditTime: 2020-09-01 21:00:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mgt_sys\backmanager\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
//MyBread其实是组件选项所在的对象
import MyBoread from '@/components/cuscom/myBread.vue'
import MyServerHttp from '@/plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import router from './router'
import moment from 'moment'
Vue.use(ElementUI)
Vue.use(MyServerHttp)
Vue.config.productionTip = false

// 全局过滤器 - 处理日期

Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})


// 全局自定义组件
Vue.component(MyBoread.name,MyBoread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render:(h)=>h(App)
  components: { App },
  template: '<App/>'
})
