<!--
 * @Author: your name
 * @Date: 2020-08-25 18:57:10
 * @LastEditTime: 2020-08-25 19:56:05
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
            <img src="../../assets/logo.jpg" alt="无法显示该图片">
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="#" class="loginout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
 data: () => ({}),
  created() {},
  methods: {}
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
.grid-content img{
  height: 60px;
  width: 180px;
}
/* 头部样式 */
.middle{
 text-align: center;
}
.loginout{
 text-decoration: none;
  line-height: 60px;
}
</style>