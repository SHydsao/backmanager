/*
 * @Author: your name
 * @Date: 2020-08-25 10:40:57
 * @LastEditTime: 2020-08-25 19:01:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mgt_sys\backmanager\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/login.vue'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home
    }
  ]
})
