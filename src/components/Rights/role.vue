<!--
 * @Author: your name
 * @Date: 2020-09-02 09:02:17
 * @LastEditTime: 2020-09-02 20:18:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editel-
 * @FilePath: \backmanager\src\components\Rights\role.vue
-->
<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="addrolebtn">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="rolelist" style="width: 100%">
      <!-- type="index" 该列的每个单元格的内容从1开始的序号 -->

      <!-- 
        children: (...)
        id: (...)
        roleDesc: (...)
        roleName: (...)
       -->
      <el-table-column type="expand" label="#" width="150">
        <template slot-scope="scope">
       <!-- 通过v-for循环 实现 行列布局-->
       <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <!-- 一级权限 -->
         <el-col :span="4">
           <!-- 角色id  权限id -->
           <el-tag @close="deleRight(scope.row,item1.id)" closable >{{item1.authName}}</el-tag>
           <i class="el-icon-arrow-right"></i>
         </el-col>
         <el-col :span="20">
           
           <el-row v-for="(item2,i) in item1.children" :key="i"> 
             <!-- 二级权限 -->
             <el-col :span="4">
                  <el-tag @close="deleRight(scope.row,item2.id)" closable type="success">{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
             </el-col>

             <!-- 三级权限 -->
             <el-col :span="20">
               <el-tag @close="deleRight(scope.row,item3.id)" closable type="warning" v-for="(item3,i) in item2.children" :key="i">{{item3.authName}}</el-tag>
             </el-col>
           </el-row>
         </el-col>
       </el-row>
        <!-- 无权限提示 -->
        <span v-if="scope.row.children.length===0">未分配权限</span>
       
        </template>
      </el-table-column>
      <el-table-column type="index"  width="150"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
      <el-table-column prop="role_name" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditUserDia(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            @click="showDeleteUserMsgBox(scope.row.id)"
            icon="el-icon-delete"
            circle
          ></el-button>

          
          <el-button
            @click="showSetRightDia(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改权限的对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">

         <!-- 
           树形结构
           data->数据源[]
           show-checkbox -> 选择框
           node-key  每一个节点的唯一标识 通常是data数据源中key名 id
           default-expanded-keys 默认展开 [要展开的节点的id]
           default-checked-keys [要选择的节点的id]
           props 配置项 [label,children]
           label   节点的文字标题和children节点的子节点
           值都来源于data绑定的数据源中的该数据的key名 'label' 'children'
           
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"

            展开所有项 el-tree 
            1. 自带方法 default-expand-all 
            2.自己封装方法   :default-expanded-keys="arrexpand"
            
            -->
      <el-tree
        ref="tree"
        :data="treelist"
        show-checkbox
        node-key="id"
        default-expand-all 
        :props="defaultProps"
        :default-checked-keys="arrcheck">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
      
    </el-dialog>
  </el-card>
</template>
<script>
export default {
   data: () => ({
   rolelist:[],
   treelist:[],
   defaultProps:{
     label:'authName',
     children:'children'
   },
   //所有节点的id值
   arrexpand:[],
   //该数组的权限id
   arrcheck:[],
   currRoleId:"-1",
   dialogFormVisibleRight:false
 }),
  created() {
    this.getRolelist()
  },
  methods: {
    //修改权限 -》 发送请求
    //roles/:roleId/rights
    async setRoleRight(){
      //roleId  当前要修改权限的角色id
      // rids  树形节点中 所有全选和半选的Label的id []
      //获取全选的id的数组arr1  getCheckedKeys()
       //el-tree.get
      //div -> js方法/属性innerText
      //1. 获取div -> DOM元素
      //2. DOM.innerText
      // var Bes = document.getElementById('div')
      // div.innerText

      //el-tree => js方法 getCheckedKeys
      //1. 给要操作的dom元素 设置ref属性值 input ref="txt"
      //2. this.$refs.ref属性值.js方法名
      let arr1 = this.$refs.tree.getCheckedKeys()
      // console.log(arr1)
      //获取半选的id的数据arr2  getHalfCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      // console.log(arr2)

      //ES6 展开运算符 数组或者对象
      let arr = [...arr1,...arr2]
      // console.log(arr)

      const res = await this.$http.post(`roles/${this.currRoleId}/rights`,
      {rids:arr.join(',')})
      // console.log(res)
      //更新视图
      this.getRolelist()
      //关闭对话框
      this.dialogFormVisibleRight = false
      
    },
    //分配权限 权限 -》 打开对话框
    async showSetRightDia(role){
      //  console.log(role)
      //给currRoleId赋值
      this.currRoleId = role.id
      //获取树形结构的权限数据
      const res = await this.$http.get(`rights/tree`)
      // console.log(res)
      this.treelist = res.data.data

      //把所有权限级别的id值 放到 arrexpand数组中
      // var arrtemp = []
      // this.treelist.forEach(item1 =>{
      //   arrtemp.push(item1.id)
      //   item1.children.forEach(item2 => {
      //     arrtemp.push(item2.id)
      //     item2.children.forEach(item3 => {
      //       arrtemp.push(item3.id)
      //     })
      //   })
      // })
      
      // console.log(arrtemp)
      // this.arrexpand = arrtemp;

      //获取当前角色role 的权限id
      let arrtemp2 = []
      role.children.forEach(item1 => {
        arrtemp2.push(item1.id)
           item1.children.forEach(item2 => {
            arrtemp2.push(item2.id)
               item2.children.forEach(item3 => {
              arrtemp2.push(item3.id)
            })
          })
      })
      this.arrcheck = arrtemp2
      this.dialogFormVisibleRight = true
    },
    //取消权限
    async deleRight(role,rightId){
      // roles/:roleId/rights/:rightId
      //roleId  当前角色id
      //rightId  要删除角色的id
        const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        // console.log(res)
        //删除成功 返回200 和角色的剩余权限

        //只更新当前角色
        role.children = res.data.data
        
        // this.getRolelist() 没必要更新整个视图
    },
    async getRolelist(){
      const res = await this.$http.get(`roles`);
      // console.log(res)
      this.rolelist = res.data.data
      // console.log(this.rolelist)
    }
  }
}
</script>
<style>
.addrolebtn {
  margin-top: 20px;
}
</style>