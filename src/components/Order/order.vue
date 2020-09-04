<!--
 * @Author: your name
 * @Date: 2020-09-04 16:15:53
 * @LastEditTime: 2020-09-04 19:44:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editcl-card
 * @FilePath: \backmanager\src\components\Order\order.vue
-->
<template>
  <el-card>
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
     <el-table :data="list" style="width: 100%">
      <!-- type="index" 该列的每个单元格的内容从1开始的序号 -->
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay==='0'">已付款</el-tag>
          <el-tag type="danger" v-if="scope.row.order_pay==='1'">未付款</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="is_send" label="是否发货" width="100">  </el-table-column>
      <el-table-column  label="下单时间" width="90"> 
          <template slot-scope="scope">{{scope.row.add_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180">
    <!--  slot-scope="scope" -->
        <template>
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditdia()"
          ></el-button>
     
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

    <!-- 对话框 -->
     <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
       <el-form :model="form">
         <el-form-item label="省市区" label-width="120px">
           <el-cascader
            expand-trigger="hover"
            clearable
            :options="catlist"
            v-model="selectedOptions"
           ></el-cascader>
         </el-form-item>
         <el-form-item label="详细地址" label-width="120px">
           <el-input v-model="form.address" autocomplete="off"></el-input>
         </el-form-item>
       </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
      
    </el-dialog>
  </el-card>
</template>
<script>
import catlist from './citydata.js'
//.vue.js 引入.js库(swiper.js/zepto.js/bscroll.js/wow.js(整屏滚动))
export default {
 data: () => ({
   list:[],
   dialogFormVisible:false,
   form:{
     address:''
   },
   //级联选择器需要绑定的数据
   catlist:[],
   selectedOptions:[]

 }),
  created() {
    this.getData()
  },
  methods: {
    async getData(){
      const res = await this.$http.get(`orders?pagenum=1&pagesize=10`);
      // console.log(res)
      this.list = res.data.data.goods;
    },
    showEditdia(){
      this.catlist = catlist
      this.dialogFormVisible = true
    }
  }
};
</script>
<style>
</style>