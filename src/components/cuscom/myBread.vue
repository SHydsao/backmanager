<!--
 * @Author: your name
 * @Date: 2020-09-01 20:32:48
 * @LastEditTime: 2020-09-01 20:59:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backmanager\src\components\custom\myBread.vue
-->
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name:'my-bread',
 data: () => ({
  //  level1:"",
  //  level2:""
 }),
 //props 值字符串数组
 // props 中的值的用法和打他数据用法一样
 //props中的数据的值 来源于使用组件时 传的值
 //props中的数据也是该组件的属性 <child-a :msg="abc">
 props:['level1','level2'],
  created() {},
  methods: {}
};
</script>
<style>
</style>