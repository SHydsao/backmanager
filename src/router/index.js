/*
 * @Author: your name
 * @Date: 2020-08-25 10:40:57
 * @LastEditTime: 2020-09-04 19:26:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mgt_sys\backmanager\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login.vue'
import Home from '@/components/Home/home.vue'
import Users from '@/components/Users/users.vue'
import Right from '@/components/Rights/right.vue'
import Role from '@/components/Rights/role.vue'
import { Message } from 'element-ui';
import Goodslist from '@/components/Goods/goodslist.vue'
import Goodsadd from '@/components/Goods/goodsadd.vue'
import Cateparams from '@/components/Goods/cateparams.vue'
import Goodscate from '@/components/Goods/goodscate.vue'
import Orderlist from '@/components/Order/order.vue'
import Reports from '@/components/Reports/reports.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [{
          name: 'users',
          path: 'users',
          component: Users
        },
        {
          name: 'right',
          path: '/rights',
          component: Right
        },
        {
          name: 'roles',
          path: '/roles',
          component: Role
        },
        {
          name: 'goods',
          path: '/goods',
          component: Goodslist
        },
        {
          name: 'goodsadd',
          path: '/goodsadd',
          component: Goodsadd
        },
        {
          name: 'params',
          path: '/params',
          component: Cateparams
        },
        {
          name: 'categories',
          path: '/categories',
          component: Goodscate
        },
        {
          name: 'orders',
          path: '/orders',
          component: Orderlist
        },
        {
          name: 'reports',
          path: '/reports',
          component: Reports
        }
      ]
    }
  ]
})



//在路由配置生效之前 统一判断token
//路由守卫 在路由配置生效之前
//路由/导航 守卫
//to 去的路由配置信息
//from 当前的路由配置
//next 让当前路由配置继续生效，继续执行
router.beforeEach((to, from, next) => {
  // to from next 
  //如果要去的是登录 -》 next()
  if(to.path==='/login'){
    next()
  }else {
      //如果去的不是登录 
      //判断token
    const token = localStorage.getItem('token')
    if(!token){
        //如果没有 就 跳到 登录界面
        //因为这个文件不是.vue文件 所以$router配置无效
      // this.$router.push({name:'login'})
      //提示
      // this.$message.warning
      Message.warning('请先登录')
      router.push({name:'login'})
      return
    }
    //如果有 -》 token
    next()
  }
})
export default router
