/*
 * @Author: your name
 * @Date: 2020-08-25 10:40:57
 * @LastEditTime: 2020-09-02 09:04:38
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
Vue.use(Router)

export default new Router({
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
          name: 'role',
          path: '/role',
          component: Role
        }
      ]
    }
  ]
})
