<template>
  <template v-for="menu in menuList" :key="menu._id">
    <el-sub-menu
      :index="menu.path"
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == 1
      "
    >
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <menu-tree :menuList="menu.children"></menu-tree>
    </el-sub-menu>
    <el-menu-item :index="menu.path" v-else>
      <span>{{ menu.menuName }}</span>
    </el-menu-item>
  </template>
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    menuList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
