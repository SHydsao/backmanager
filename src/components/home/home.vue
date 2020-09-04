<!--
 * @Author: your name
 * @Date: 2020-08-25 18:57:10
 * @LastEditTime: 2020-09-04 12:48:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mgt_sys\backmanager\src\components\home\home.vue
-->
<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../assets/logo.jpg" alt="无法显示该图片" />
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="#" class="loginout" @click="handleSignout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- 侧边栏导航 -->
        <!-- unique-opened 保持一个子菜单的展开 -->
        <!-- router 开启路由模式 -->
        <el-menu 
        :unique-opened="true" 
        :router="true">
          <!-- 1 -->
          <el-submenu :index="''+item1.order" v-for="(item1,index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item :index="item2.path" v-for="(item2,index) in item1.children" :key="index">
              <i class="el-icon-menu"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
     
          
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  //new Vue之前自动触发
  beforeCreate() {
  //获取token
  // const token = localStorage.getItem('token')
  // if(!token){
      //如果没有 就 跳到 登录界面
    // this.$router.push({name:'login'})
  // }
    //如果有 token 继续渲染组件  
  },
 data: () => ({
   menus:[]
 }),

  created() {
    this.getMenus()
  },
  methods: {
    //获取导航数据
    async getMenus(){
      const res = await this.$http.get(`menus`);
      this.menus = res.data.data
      // console.log(res)
    },
    handleSignout(){
      //1.清除token
      localStorage.clear()
      //2.提示
      this.$message.success('退出成功')
      //3.来到login组件
      this.$router.push({name:'login'})
    }
  }
};
</script>
<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
}
.grid-content img {
  height: 60px;
  width: 180px;
}
/* 头部样式 */
.middle {
  text-align: center;
}
.loginout {
  text-decoration: none;
  line-height: 60px;
}
</style>