<!--
 * @Author: your name
 * @Date: 2020-08-25 11:27:46
 * @LastEditTime: 2020-08-25 19:31:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mgt_sys\backmanager\src\components\login\login.vue
-->
<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handeLogin()" class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data: () => ({
    formdata: {
      username: '',
      password: ''
    }
  }),
  created () {},
  methods: {
    // 登录请求
    async handeLogin () {
      //希望 让异步操作代码 看起来像同步代码
      //同步写法
      // ES7 async await 
       const res = await this.$http.post('login', this.formdata)
        console.log(res)
        const {
          data,
          meta: {msg,status}
        } = res.data
      
        if (status === 200) {
          // 登录成功
          // 0.保存token值
          localStorage.setItem('token',data.token)
          // 1.跳转到home
          this.$router.push({name: 'home'})
          // 2.提示成功
            this.$message.success(msg);
        }
        else{
             // 不成功
            // 1. 提示消息
            this.$message.warning(msg)
        }



      //异步写法
      // this.$http.post('login', this.formdata).then(res => {
      //   // console.log(res)
      //   const {
      //     data,
      //     meta: {msg,status}
      //   } = res.data
      
      //   if (status === 200) {
      //     // 登录成功
      //     // 1.跳转到home
      //     this.$router.push({name: 'home'})
      //     // 2.提示成功
      //       this.$message.success(msg);
      //   }
      //   else{
      //        // 不成功
      //       // 1. 提示消息
      //       this.$message.warning(msg)
      //   }
      // })
    }
  }
}
</script>
<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 6px;
  padding: 30px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>
