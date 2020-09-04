<!--
 * @Author: your name
 * @Date: 2020-09-03 08:32:58
 * @LastEditTime: 2020-09-03 09:22:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backmanager\src\components\Goods\goodslist.vue
-->
<template>
  <el-card class="box-card">
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
  <el-row class="searchArea">
    <el-col :span="24">
      <!-- v-model="searchValue"  -->
     <el-input  class="searchInput" clearable placeholder="请输入内容">
       <!-- <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button> -->
       <el-button slot="append" icon="el-icon-search"></el-button>
     </el-input>
     <!-- <el-button  type="success" plain>添加商品</el-button> -->
     <el-button type="success" @click="$router.push({name:'goodsadd'})" plain>添加商品</el-button>
    </el-col>
  </el-row>
    
    <!-- 表格 -->
    <!--  v-loading="loading" -->
     <el-table :data="list" style="width: 100%"
     height="450px" border stripe>
      <!-- type="index" 该列的每个单元格的内容从1开始的序号 -->
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>

      <el-table-column label="创建时间">

        <template slot-scope="scope">{{scope.row.add_time | fmtdate}}</template>
    
      </el-table-column>

      <el-table-column prop="role_name" label="操作">
        <!--         @click="showEditUserDia(scope.row)" -->
        <!-- slot-scope="scope" -->
        <template >
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
    
          ></el-button>
          <!--   @click="showDeleteUserMsgBox(scope.row.id)" -->
          <el-button
            size="mini"
            plain
            type="danger"
          
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>
<script>
export default {
 data: () => ({
   query:"",
   list:[],
   //分页相关的数据
   total:-1,
   pagenum:1,
   pagesize:2,
 }),
  created() {
    this.getGoodslist()
  },
  methods: {
  
       //分页相关的方法
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = val
              //  this.pagenum = 1
        this.getGoodslist()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
          this.pagesize = val
          this.getGoodslist()
      },
    //获取商品信息
    async getGoodslist(){
       const res = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      //  console.log(res)
      const {meta:{status,msg},data:{goods,total}} = res.data
      if(status === 200){
        //1.给表格数据赋值
        this.list = goods
        //2.给total赋值
        this.total = total
      } 
      }
  }
};
</script>
<style>
.box-card {
  height: 100%;
}
.searchArea {
  margin-top: 16px;
}
.searchInput {
  width: 360px;
}
</style>