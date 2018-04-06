<template>
  <el-container class="container">
    <el-main class="main">
      <el-row type="flex" justify="center">
        <el-card class="box-card">
          <div slot="header">
            <router-link class="logo-title" to="/" tag="span">
              <i class="fa fa-truck" aria-hidden="true"></i>
              华物链
            </router-link>
          </div>
          <el-form ref="form" :rules="rules" :model="loginForm">
            <el-form-item prop="name">
              <el-input placeholder="请输入帐号" v-model="loginForm.name" clearable="" prefix-icon="fa fa-user">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="请输入密码" v-model="loginForm.password" type="password" clearable="" prefix-icon="fa fa-lock">
              </el-input>
            </el-form-item>
            <el-checkbox class="checkbox" name="type" label="记住密码"></el-checkbox>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')" class="login-btn" :loading="loading">{{ buttonText }}</el-button>
            </el-form-item>
            <el-form-item>
              <router-link to="/register">没有帐号？前往注册</router-link>
            </el-form-item>
          </el-form>
        </el-card>
      </el-row>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
.container {
  height: 100%;
  background-image: url("../assets/login-bg.png");
  background-size: 100% auto;
  // background-repeat: no-repeat;
}
.box-card {
  width: 360px;
}
.main {
  align-self: center;
}
.text {
  font-size: 26px;
  color: #409eff;
}
.login-btn {
  width: 320px;
}
.checkbox {
  margin-bottom: 16px;
  text-align: start;
  width: 100%;
}
</style>
<script>
export default {
  data () {
    return {
      loading: false,
      loginForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入帐号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    buttonText () {
      return this.loading ? '登录中' : '登录'
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$message.success('登录成功，即将前往个人主页')
        } else {
          this.$message.success('登录失败')
          return false
        }
      })
    }
  }
}
</script>
