<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.el-container {
    height: 100%;
    .el-header {
        background-image: linear-gradient(90deg,rgb(151, 72, 224),rgb(47, 5, 87));
        color: #333;
        text-align: center;
        line-height: 60px;
    }
  .el-aside {
        height: 100%;
        background-image: linear-gradient(180deg,rgb(151, 72, 224),rgb(47, 5, 87));
    }
    .el-main {
        background-color: rgb(234,237,241);
    }
}

</style>
