<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-title">绿地</div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="userName">
          <el-input
            placeholder="请输入用户名"
            clearable
            :prefix-icon="User"
            v-model="form.userName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input
            placeholder="请输入密码"
            show-password
            clearable
            :prefix-icon="Lock"
            v-model="form.userPwd"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Lock, User } from '@element-plus/icons'
import { userLogin, what } from './../api/user/login'
import { ElMessage } from 'element-plus'

export default {
  name: 'login',
  methods: {},
  data() {
    return {
      User,
      Lock,
      form: {
        userName: '',
        userPwd: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        userPsw: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 16,
            message: '密码不能小于8位大于16位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const res = await userLogin({
              userName: this.form.userName,
              userPwd: this.form.userPwd
            })
            ElMessage.success('登录成功')
            this.$store.commit('saveUserInfo', res)
            this.$router.push('/welcome')
          } catch (err) {
            console.log(err)
            ElMessage.error('登录失败')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: rgb(36, 117, 36);
  .login-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    padding: 25px 40px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgb(0, 0, 0);
    .login-title {
      width: 100%;
      text-align: center;
      font-size: 28px;
      padding: 20px 0 30px;
    }
  }
}
</style>
