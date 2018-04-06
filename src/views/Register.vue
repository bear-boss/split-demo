<template>
  <el-container class="container">
    <el-main class="main">
      <el-row type="flex" justify="center">
        <el-card class="box-card" style="padding: 20px 30px 20px 20px">
          <div slot="header">
            <router-link class="logo-title" to="/" tag="span">
              <i class="fa fa-truck" aria-hidden="true"></i>
              华物链
            </router-link>
          </div>
          <el-form ref="form" :rules="rules" label-width="100px" :model="registerForm">
            <el-form-item label="帐号：" prop="account">
              <el-input placeholder="请输入帐号" v-model="registerForm.account" clearable="" prefix-icon="fa fa-user">
              </el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input placeholder="请输入密码" type="password" v-model="registerForm.password" clearable="" auto-complete="off" prefix-icon="fa fa-lock">
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="confirmPassword">
              <el-input placeholder="请输入密码" type="password" v-model="registerForm.confirmPassword" clearable="" auto-complete="off" prefix-icon="fa fa-lock">
              </el-input>
            </el-form-item>
            <el-form-item label="钱包地址：" prop="walletAddress">
              <el-input placeholder="请输入钱包地址" v-model="registerForm.walletAddress" clearable="" prefix-icon="fa fa-btc">
              </el-input>
            </el-form-item>
            <el-form-item label="用户类别：" prop="userrole">
              <el-select placeholder="请选择" style="width:100%" v-model="registerForm.userrole">
                <el-option label="普通用户" value="normal"></el-option>
                <el-option label="物流节点用户" value="lpoint"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" class="login-btn" style="margin-top: 20px" @click="submitForm('form')" :loading="loading">{{ buttonText }}</el-button>
            <el-row style="margin-top:30px">
              <router-link to="/login" style="font-size: 14px">
                已有账号？返回登录
              </router-link>
            </el-row>
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
  background-repeat: no-repeat;
}
.box-card {
  width: 400px;
}
.main {
  align-self: center;
}
.login-btn {
  width: 320px;
}
</style>
<script>
export default {
  data () {
    return {
      loading: false,
      registerForm: {
        account: '',
        password: '',
        confirmPassword: '',
        walletAddress: '',
        userrole: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入帐号', trigger: 'blur' }
        ],
        password: [
          { validator: this.validatePass, trigger: 'blur', required: true }
        ],
        confirmPassword: [
          { validator: this.validatePass2, trigger: 'blur', required: true }
        ],
        walletAddress: [
          { required: true, message: '请输入钱包地址', trigger: 'blur' }
        ],
        userrole: [
          { required: true, message: '请选择用户类别', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    buttonText () {
      return this.loading ? '注册中' : '注册'
    }
  },
  methods: {
    validatePass (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.confirmPassword !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    },
    validatePass2 (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$message.success('注册成功，即将前往登录界面')
        } else {
          this.$message.error('注册失败')
          return false
        }
      })
    }
  }

}
</script>
