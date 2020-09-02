<!--
 * @Author: your name
 * @Date: 2020-09-01 17:44:58
 * @LastEditTime: 2020-09-02 09:01:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editthis is
 * @FilePath: \backmanager\src\components\Rights\rights.vue
-->
<template>
  <el-card>
    <!-- 1.面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>-->

    <my-bread level1="权限管理" level2="权限列表"></my-bread>

    <!-- 2.表格 -->
    <el-table :data="rightlist" border style="width: 100%" class="table">
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <!-- 因为它不是一个字符串 所以要包裹一个template -->
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
 data: () => ({
   rightlist:[]
 }),
  created() {
    this.getRightList()
  },
  methods: {
    async getRightList(){
      const res = await this.$http.get(`rights/list`);
      this.rightlist = res.data.data
    }
  }
};
</script>
<style>
.table{
  height: "400px";
  margin-top: 14px;
}
</style>