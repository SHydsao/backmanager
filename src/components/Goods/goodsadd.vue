<!--
 * @Author: your name
 * @Date: 2020-09-03 09:23:12
 * @LastEditTime: 2020-09-04 15:45:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings 添加商品
 * @FilePath: \backmanager\src\components\Goods\goodsadd.vue
-->
<template>
    <el-card class="box-card">
      <!-- 1. 面包屑 -->
      <my-bread level1="商品管理" level2="商品列表"></my-bread>

      <!-- 2.提示 el-alert -->
        <el-alert
          title="成功提示的文案"
          type="success"
          center
          show-icon
          class="alert">
        </el-alert>
      <!-- 3.步骤条 -->
      <!--active 表示执行的步数   -->
      <el-steps :active="1*active" finish-status="success" simple style="margin-top: 20px">
        <el-step title="基本信息" ></el-step>
        <el-step title="商品参数" ></el-step>
        <el-step title="商品属性" ></el-step>
        <el-step title="商品图片" ></el-step>
        <el-step title="商品内容" ></el-step>
      </el-steps>

      <!-- 左侧列表 -->
      <!-- active 这里的active表示 我点击哪个 对应的显示 哪个name值 
      所以上面的步骤条  的 :active 绑定 为 active -->
      <!-- {{active}} -->
      <!-- 最外层包裹是el-form -->
      <!-- 8986112022508082819 -->
      <el-form 
      label-position="top" 
      label-width="80px" 
      :model="form"
      style="height:300px;overflow:auto">
        <el-tabs @tab-click="tabChange()" v-model="active" tab-position="left">
          <el-tab-pane name="1" label="基本信息">
             <el-form-item label="商品名称">
              <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="form.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="form.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <!-- 级联选择器 -->
              
              <!-- 对应每级菜单的id -->
              <!-- {{selectedOptions}} -->
                <el-cascader
                  clearable
                  expand-trigger="hover"
                  v-model="selectedOptions"
                  :options="options"
                  :props="defaultProp"
                  @change="handleChange">
                </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="2" label="商品参数">
             <el-form-item 
                  :label="item1.attr_name"  
                  v-for="(item1,i) in arrDyparams"
                  :key="i">
                  <!-- 复选框组 -->
                  <el-checkbox-group v-model="item1.attr_vals">
                    <el-checkbox 
                     border
                     v-for="(item2,i) in item1.attr_vals"
                     :key="i"
                     :label="item2"
                    ></el-checkbox>
                  </el-checkbox-group>
              </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="3" label="商品属性">
            <!-- 获取静态参数数据 -->
             <el-form-item :label="item.attr_name" v-for="(item,i) in arrStaparams" :key="i">
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            
          </el-tab-pane>
          <el-tab-pane name="4" label="商品图片">
             <el-form-item>
               <!-- baseUrl axios 发的请求 在这里无效 -->
                <el-upload
                  action="http://localhost:8888/api/private/v1/upload"
                  :headers="headers"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
             </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="5" label="商品内容">
            <el-form-item>
              <!-- 表单元素 -->
              <el-button type="primary" @click="addGoods()">点我-添加商品 </el-button>
              <!-- 富文本编辑器 -->
              <quill-editor v-model="form.goods_introduce"></quill-editor>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <!-- <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
       
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </el-form> -->
    </el-card>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor' 
export default {
     components:{
      quillEditor
    },
 data: () => ({
   active:'1',
   //添加商品的表单数据
   //this.$http.post(url,this.form)
  /* 
    已处理数据
    goods_name 商品名称   不能为空
    goods_price 价格   不能为空
    goods_number 数量   不能为空
    goods_weight 重量    不能为空
    goods_introduce 介绍  可以为空

    未处理数据
    1.
    goods_cat 以为 ','分割的分类列表   不能为空 -> 级联选择器绑定的 selectedOptions
    this.selectoption -> string
    2.
    pics 上传的图片临时路径（对象）可以为空
    pics 是数组 [{pic:图片的临时路径}]
    3.
    attrs 商品的参数（数组）， 包含 `动态参数` 和 `静态属性`   可以为空
    动态参数和静态参数
   */
   form:{
     goods_name:'',
     goods_cat:'',
     goods_price:'',
     goods_number:'',
     goods_weight:'',
     goods_introduce:'',
     pics:[],
     attrs:''
   },
   //级联选择器绑定的数据

  //  对应每级菜单的id 
    selectedOptions:[1,3,6],
    options:[],
    defaultProp:{
      label:'cat_name',
      value:'cat_id',
      children:'children'
    },
    //动态参数的数据数组
    arrDyparams:[],

    //静态参数的数据数组
    arrStaparams:[],
    headers:{
      Authorization:localStorage.getItem('token')
    }

 }),
  created() {
    this.getGoodCate()
  },
  methods: {
    //添加商品 -》 发送请求
    async addGoods(){
      //goods_cat -> 分类
      this.form.goods_cat = this.selectedOptions.join(',')

      //pics 再上床和移除图片时 进行赋值和删除 [].findIndex()

      //attrs [{attr_id:?,attr_value:?}]
      //动态参数数组
      //遍历 + 取值 + 放在一个新数组中
      let arr1 = this.arrDyparams.map((item)=>{
        //item.attr_id和item.attr_vals
        return {attr_id:item.attr_id,attr_value:item.attr_vals}
      })
      // console.log(this.arrDyparams)
      // console.log(arr1)
      //静态参数数组
       let arr2 = this.arrStaparams.map((item)=>{
        //item.attr_id和item.attr_vals
        return {attr_id:item.attr_id,attr_value:item.attr_vals}
      })
      
      this.form.attrs = [...arr1,...arr2]

      //在发送请求之前，处理this.form中的未处理数据
      //pic[] {pic:?}
      const res = await this.$http.post(`goods`,this.form)
      console.log(res)
      //回到商品列表
      this.$router.push({name:"goods"})
    },
    //图片上传时的相关方法
    handlePreview(file){

    },
    handleRemove(file){
      //file.response.data.tmp_path 图片临时删除的路径

      //this.form.pics 移除当前x掉的图片
      //先获取该图片的索引
      //findIndex() 把符合条件的元素的索引进行返回
      //pics [{pic:图片路径1},{pic:图片路径2}]
      let Index = this.form.pics.findIndex((item)=>{
        return item.pic === file.response.data.tmp_path 
      })
      this.form.pics.splice(Index,1)
      // console.log(this.form.pics)
    },
    //
    handleSuccess(file){
      //file.data.tmp_path 图片临时上传的路径
      //给 this.form.pics 添加临时路径
      this.form.pics.push({
        pic:file.data.tmp_path
      })
    },
    //点击不同的tab时 触发该方法
   async tabChange(){
      //如果点击的是第二个tab 同时 三级分类要有值
      if(this.active==='2'){
        if(this.selectedOptions.length!==3){
          //提示
          this.$message.warning('请先选择商品的三级分类')
          return
        }
        //获取分类参数列表数据
        //id -> 分类id
        const res  =await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
        // console.log(res)
        this.arrDyparams = res.data.data
        // this.arrDyparams 每个对象attr_vals字符串-》数组-》v-for
        this.arrDyparams.forEach(item=>{
          //  
         item.attr_vals = item.attr_vals.length===0?[]:item.attr_vals.trim().split(',')
        })
      }else if(this.active==='3'){
          if(this.selectedOptions.length!==3){
          //提示
          this.$message.warning('请先选择商品的三级分类')
          return
        }
        //获取静态参数的数据
        const res  =await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
        // console.log(res)
        this.arrStaparams = res.data.data
      }

    }, 
 
    //级联选择器 change 触发的事件
    handleChange(){
      
    },
    //获取 三级分类的信息
    async getGoodCate(){
      const res = await this.$http.get(`categories?type=3`)
      // console.log(res)
      this.options = res.data.data
    }
  }
};
</script>
<style>
.alert{
  margin-top: 14px;
}
.ql-editor{
  min-height: 300px;
}
</style>