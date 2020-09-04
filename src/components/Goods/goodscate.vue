<!--
 * @Author: your name
 * @Date: 2020-09-04 11:10:05
 * @LastEditTime: 2020-09-04 16:06:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editl
 * @FilePath: \backmanager\src\components\Goods\goodscate.vue
-->
<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24" class="searchArea">
        <el-button type="success" @click="addGoodsCate()">添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
           <!-- 级联选择器  表单元素-->
        <el-form-item label="分类" :label-width="formLabelWidth">
            {{selectedOptions}}
                <!-- 级联选择器 -->
                <el-cascader
                  clearable
               
                  expand-trigger="hover"
                  v-model="selectedOptions"
                  :options="caslist"
                  :props="defaultProp"
                ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addCate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
     <el-table :data="list" style="width: 100%" height="450">
 <!-- <el-table-column label="分类名称" prop="cat_name"> </el-table-column> -->

          <!--
            treekey -> nodekey -> 节点唯一表示 id
            paeentKey -> 父节点的id
            levelKey -> 当前节点的级别
            childKey -> 子节点
            -->
          
          <el-tree-grid
            prop="cat_name"
            label="分类名称"
            treeKey="cat_id"
            parentKey="cat_pid"
            levelKey="cat_level"
            childKey="children"
          >
          </el-tree-grid>
          <el-table-column label="级别">
            <template slot-scope="scope">
              <!-- 因为它不是一个字符串 所以要包裹一个template -->
              <span v-if="scope.row.cat_level===0">一级</span>
              <span v-else-if="scope.row.cat_level===1">二级</span>
              <span v-else-if="scope.row.cat_level===2">三级</span>
            </template>
          </el-table-column>
          <el-table-column label="是否有效">
            <template slot-scope="scope">
                <span v-if="scope.row.cat_deleted===false">有效</span>
                <span v-else-if="scope.row.cat_deleted===true">无效</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
                @click="showEditdia(scope.row)"
              ></el-button>
              <el-button
                size="mini"
                plain
                type="danger"
                @click="showDelefirm(scope.row)"
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
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
  </el-card>
</template>
<script>
//引入 element-tree-grid
var ElTreeGrid = require('element-tree-grid');
export default {
  //组件名 <el-tree-grid></el-tree-grid>
  components:{
    ElTreeGrid
  },
 data: () => ({
   list:[],
   pagenum:1,
   pagesize:50,
   total:1,
   dialogFormVisibleAdd:false,
   form:{
     cat_pid:-1,
     cat_name:"",
     cat_level:-1
   },
   formLabelWidth:"140px",
   //级联选择器要用的数据
   caslist:[],
     selectedOptions:[],
      defaultProp:{
        label:'cat_name',
        value:'cat_id',
        children:'children'
      },
 }),
  created() {
    this.getGoodsCate()
  },
  methods: {
    //添加分类- 发送请求
    async addCate(){
      //cat_pid   分类父 ID   不能为空，如果要添加1级分类，则父分类Id应该设置为  `0`
      //cat_name    分类名称    不能为空
      //cat_level     分类层级     不能为空，`0`表示一级分类；`1`表示二级分类；`2`表示三级分类

      //三种情况
      //1. 一级分类 selectedOptions.length==0 cat_pid=0 cat_level=0
      //2. 二级分类  selectedOptions.length==1 cat_pid=selectedOptions=[0] cat_level=1
      //2. 三级分类  selectedOptions.length==2 cat_pid=selectedOptions=[1] cat_level=2
      if(this.selectedOptions.length===0){
        this.form.cat_pid=0
        this.form.cat_level=0
      }else if(this.selectedOptions.length===1){
        this.form.cat_pid = this.selectedOptions[0]
        this.form.cat_level = 1
      }else if(this.selectedOptions.length===2){
        this.form.cat_pid = this.selectedOptions[1]
        this.form.cat_level = 2
      }
      const res = await this.$http.post(`categories`,this.form)
      console.log(res)
      //更新视图
      this.getGoodsCate()
      //关闭对话框
      this.dialogFormVisibleAdd = false
      //清空form
      this.form = {}

    },
    //添加分类- 显示对话框
    async addGoodsCate(){
      //获取二级分类的数据


      const res = await this.$http.get(`categories?type=2`)
      this.caslist = res.data.data
      // console.log(res)
      // this.options = res.data.data

      this.dialogFormVisibleAdd = true
    },
     //获取所有分类
    async getGoodsCate(){
      const res = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      this.list = res.data.data.result;

      // console.log(this.list)
      this.total = res.data.data.total;
    },
    //分页相关的方法
       handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.pagenum = 1
        this.getGoodsCate()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        //  this.pagenum = 2 = val
          this.pagenum = val
          this.getGoodsCate()
      },
   
  
    showEditdia(){
      
    },
    showDelefirm(){
      
    }
  }
};
</script>
<style>
.searchArea{
  margin-top: 14px;
}
</style>