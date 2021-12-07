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
  },
  async mounted() {
    // this.$request({
    //   method: 'get',
    //   url: '/login',
    //   data: {
    //     name: 'booker'
    //   }
    // }).then((res) => {
    //   console.log(res)
    // })
    const res = await this.$request
      .get('/login', {
        name: 'booker'
      })
      .catch((err) => {
        console.log('错误', err)
      })
    console.log('结果', res)
  }
}
</script>

<style></style>
