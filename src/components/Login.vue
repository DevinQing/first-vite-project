<template>
  <div>
    <h2>登录页面</h2>
    <el-button @click="goHome">回首页</el-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    goHome() {
      this.$router.push('/welcome')
    }
  }
}
</script>

<style></style>
