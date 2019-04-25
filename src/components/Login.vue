<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <img src="../assets/img/03.jpg" alt>
      </div>
      <el-form :rules="loginFormRules" ref="loginFormRef" :model="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="iconfont icon-username"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password>
            <i slot="prefix" class="iconfont icon-password"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :push="15">
            <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="info" @click="reset()">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFormRules: {
        username: [{ required: true, message: '用户名必填', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }]
      },
      loginForm: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  methods: {
    reset() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      // 对各个表单域进行再次验证
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid);
        if (valid === true) {
          // 用户名，密码真实性校验(axios带着去服务器端完成)
          const { data: dt } = await this.$http.post('login', this.loginForm)
          // 用户名，密码错误提示
          if (dt.meta.status != 200) {
            // 提示错误信息
            return this.$message({
              type: 'error',
              message: dt.meta.msg
            })
          }

          // 管理员的账号校验没有问题，把获得回来的token存储给sessionStorage
          window.sessionStorage.setItem('token', dt.data.token)
          // 跳转到后台首页面
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          this.$router.push('/home')
        }
      })
      //
      // this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background: url(02.jpeg) no-repeat;
  background-size: 100%;
  overflow: hidden;
  .login-box {
    width: 450px;
    height: 304px;
    // background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar-box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 8px;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .el-form {
      width: 100%;
      position: absolute;
      bottom: 0;
      padding: 20px;
      box-sizing: border-box;
    }
    .el-button--primary {
      background-image: linear-gradient(
        90deg,
        rgb(193, 150, 233),
        rgb(47, 5, 87)
      );
      border-color: rgb(131, 73, 185);
    }
    .el-button--info {
      background-image: linear-gradient(
        90deg,
        rgb(193, 150, 233),
        rgb(47, 5, 87)
      );
      border-color: rgb(131, 73, 185);
    }
  }
}
</style>
