<template>
  <el-container>
    <el-header>
      <div class="logo-box">
        <img src="../assets/img/03.jpg" alt>
        <span>电商后台管理系统</span>
      </div>
      <el-row>
        <el-button type="info" @click="logout()">退出</el-button>
      </el-row>
    </el-header>
    <el-container>
      <el-aside :width="isshow?'65px':'200px'">
        <div class="button" @click="isshow = !isshow">|||</div>
        <el-menu
          :unique-opened="true"
          :collapse-transition="false"
          background-color="rgb(51, 55, 68)"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isshow"
          :router="true"
        >
          <el-submenu
            :index="item.id + ''"
            :style="{width:isshow?'65px':'200px'}"
            v-for="(item , k) in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="'iconfont icon-' + iconList[k]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="item2 in item.children" :key="item2.id">
              <i class="iconfont icon-leimupinleifenleileibie2"></i>
              {{ item2.authName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      this.$confirm('确认要退出系统吗?', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    async getMenuList() {
      const { data: dt } = await this.$http.get('menus')
      // console.log(dt)
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      this.menuList = dt.data
    }
  },
  data() {
    return {
      iconList: [
        'username',
        'quanxianguanli',
        'shangpinguanli',
        'ziyuan',
        'icon-test'
      ],
      menuList: [],
      isshow: false
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .button {
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    letter-spacing: 0.1em;
    background-color: rgb(74, 80, 100);
    cursor: pointer;
    user-select: none;
  }
  .el-header {
    background: url(../assets/img/000.jpeg);
    background-size: 100%;
    background-position: 100px 0;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0;
    padding-right: 20px;
    .logo-box {
      color: #fff;
      font-size: 22px;
      display: flex;
      align-items: center;
      user-select: none;
      span {
        color: #fff;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    height: 100%;
    // background-color: #333744;
    background: url(../assets/img/000.jpeg);
    background-size:1900px 100%;
    background-position:0 -100px;
    i {
      margin-right: 10px;
    }
  }
  .el-main {
    // background-color: #eaedf1;
    background: url(../assets/img/000.jpeg);
    background-size: 100%;
    background-position:0 -53px;
  }
}
</style>
