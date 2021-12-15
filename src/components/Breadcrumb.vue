<template>
  <el-breadcrumb separator="<">
    <el-breadcrumb-item v-for="(item, index) in list" :key="item.path"
      ><a href="/welcome" v-if="index == 0">{{ item.meta.title }}</a>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    list() {
      // 需要注意 子路由路径不要加斜杠
      return this.$route.matched
    }
  }
}
</script>

<style lang="scss">
.el-breadcrumb__inner a {
  &:hover {
    color: darkgreen;
  }
}
</style>
