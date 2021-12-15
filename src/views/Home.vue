<template>
  <div class="basic-layout">
    <div class="nav-side">
      <div class="top">
        <div class="collapse-icon" @click="this.isCollapse = !this.isCollapse">
          <el-icon :size="28"><expand /></el-icon>
        </div>
        <span v-show="!isCollapse">Manager</span>
      </div>
      <div class="menu">
        <el-menu
          :default-active="activeMenu"
          active-text-color="#ffd04b"
          background-color="darkgreen"
          class="el-menu-vertical-demo"
          text-color="#fff"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <menu-tree :menuList="menuList"></menu-tree>
        </el-menu>
      </div>
    </div>
    <div class="content-right">
      <div class="nav-top">
        <div class="bread-box">
          <breadcrumb />
        </div>
        <div class="user">
          <span class="user-name">{{ userInfo.userName || '未登录' }}</span>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-badge
                :value="noticeCount"
                class="item"
                :hidden="noticeCount == 0"
              >
                <el-icon :size="24"> <bell /> </el-icon>
              </el-badge>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                  >邮箱: {{ userInfo.userEmail }}</el-dropdown-item
                >
                <el-dropdown-item command="outLogin">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <router-view class="main-page"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { getNoticeCount, getMenuList } from '@/api/user/login'
import MenuTree from '@/components/MenuTree.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  name: 'Home',
  components: {
    MenuTree,
    Breadcrumb
  },
  data() {
    return {
      isCollapse: false,
      userInfo: {},
      noticeCount: 0,
      menuList: [],
      activeMenu: window.location.hash.slice(1)
    }
  },
  methods: {
    handleCommand(commend) {
      if (commend === 'email') return
      if (commend === 'outLogin') {
        this.$store.commit('saveUserInfo', {})
        this.userInfo = {}
        this.$router.push('/login')
      }
    },
    async fetchNoticeCount() {
      try {
        const res = await getNoticeCount()
        this.noticeCount = res
      } catch (err) {
        console.log(err)
      }
    },
    async fetchMenuList() {
      try {
        const res = await getMenuList()
        this.menuList = res
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.userInfo = this.$store.state.userInfo
    this.fetchNoticeCount()
    this.fetchMenuList()
  }
}
</script>

<style lang="scss" scoped>
$base-color: darkgreen;
.basic-layout {
  display: flex;
  .nav-side {
    height: 100vh;
    background-color: $base-color;
    color: #fff;
    overflow-y: auto;
    .top {
      width: 100%;
      height: 50px;
      display: flex;
      .collapse-icon {
        width: 64px;
        text-align: center;
        line-height: 64px;
        cursor: pointer;
      }
      span {
        flex: 1;
        width: 140px;
        color: #fff;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        font-weight: 600;
      }
    }
    .menu {
      height: calc(100vh - 50px);
      .el-menu-vertical-demo {
        border: 0;
      }
    }
  }
  .content-right {
    flex: 1;
    .nav-top {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      padding: 0 30px;

      .bread-box {
        display: flex;
        align-items: center;
      }
      .user {
        display: flex;
        .user-name {
          color: $base-color;
          font-weight: 500;
        }
        .el-dropdown-link {
          display: flex;
          margin: 13px 10px 0;
          .el-icon {
            cursor: pointer;
          }
        }
      }
    }
    .wrapper {
      height: calc(100vh - 50px);
      background-color: #ecedf2;
      padding: 20px;
      .main-page {
        width: 100%;
        height: 100%;
        background-color: #fff;
      }
    }
  }
}
</style>
