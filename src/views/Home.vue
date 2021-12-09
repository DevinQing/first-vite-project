<template>
  <div class="basic-layout">
    <div class="nav-side"></div>
    <div class="content-right">
      <div class="nav-top">
        <span>面包屑</span>
        <span>用户</span>
      </div>
      <div class="wrapper">
        <router-view class="main-page"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.basic-layout {
  display: flex;
  .nav-side {
    width: 200px;
    height: 100vh;
    background-color: darkgreen;
    color: #fff;
    overflow-y: auto;
    transition: all 0.5s;
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
