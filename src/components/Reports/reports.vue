<!--
 * @Author: your name
 * @Date: 2020-09-04 19:22:27
 * @LastEditTime: 2020-09-04 20:29:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings E
 * @FilePath: \backmanager\src\components\Reports\reports.vue
-->
<template>
  <div>
    <!-- 面包屑导航区 -->
     <my-bread level1="数据统计" level2="数据报表"></my-bread>
    <!-- 卡片视图 -->
    <el-card>
        <!-- 2.为Echarts准备一个Dom -->
        <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
// 1.导入echarts
import echarts from 'echarts'

export default {
  data () {
    return {
   
    }
  },
  created () {

  },
  // 此时,页面上的元素,已经被渲染完毕了
  async mounted () {
    this.useEchart()
  },
  methods: {
   async useEchart(){
      //init
       var myChart = echarts.init(document.getElementById('main'))
        const res = await this.$http.get('reports/type/1')
        console.log(res)
        var option2 = res.data.data
       let option1 = {
           title: {
                text: '堆叠区域图'
            },
            tooltip: {
              trigger:'axis',
              axisPointer:{
                type:"cross",
                label:{
                  backgroundColor:"#6a7985"
                }
              }
            },
            toolbox:{
              feature:{
                saveAsImage:{}
              }
            },
            grid:{
              left:"3%",
              right:"4%",
              bottom:"3%",
              containLabel:true
            }

       };
       let option = {...option1,...option2};
       
      myChart.setOption(option)
       
    }
  }
}
</script>

<style>

</style>
