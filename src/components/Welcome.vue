<template>
  <div>
    <p>welcome to my project</p>
    <el-calendar v-model="value"></el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style lang="less" scoped>
p {
  color: #fff;
}
</style>
