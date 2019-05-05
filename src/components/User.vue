<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 修改用户 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editUserDialog"
      width="50%"
      @close="$refs.editUserRef.resetFields()"
    >
      <el-form ref="editUserRef" :rules="editUserRules" :model="editUser" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUser.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editUser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="xiugai()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addUserdialog"
      width="50%"
      @close="$refs.addUserRef.resetFields()"
    >
      <el-form ref="addUserRef" :rules="addUserRules" :model="addUser" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUser.mobile"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserdialog = false">取 消</el-button>
        <el-button type="primary" @click="tianjia()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 卡片区 -->
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            @keyup.enter.native="getUserList()"
            @clear="getUserList()"
            clearable
            v-model="querycdt.query"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-row>
            <!-- 添加用户按钮 -->
            <el-button type="primary" @click="addUserdialog = true ">添加用户</el-button>
          </el-row>
        </el-col>
      </el-row>
      <template>
        <!-- 数据列表区域 -->
        <el-table :data="userList" border stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="mobile" label="手机号码" width="120"></el-table-column>
          <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
          <el-table-column prop="mg_state" label="状态" width="70">
            <!-- <span slot-scope="info">{{info.row.mg_state===true?'显示':'不显示'}}</span> -->
            <el-switch v-model="info.row.mg_state" slot-scope="info"></el-switch>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="info">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEiditDialog(info.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delUser(info.row.id)"
              ></el-button>
              <el-tooltip
                :enterable="false"
                class="item"
                effect="dark"
                content="分配角色"
                placement="top"
              >
                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querycdt.pagenum"
        :page-sizes="[3, 5, 10, 12]"
        :page-size="querycdt.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tot"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserList()
  },
  methods: {
    // 修改用户
    xiugai() {
      this.$refs.editUserRef.validate(async valid => {
        if (valid === true) {
          const { data: dt } = await this.$http.put('users/' + this.editUser.id,this.editUser)
          console.log(dt)
          if(dt.meta.status != 200){
            return this.$message.error(dt.meta.msg)
          }
          // 修改成功
          this.$message.success(dt.meta.msg)
          this.editUserDialog = false
          this.getUserList()
        }
      })
    },
    // 修改用户
    async showEiditDialog(id) {
      const { data: dt } = await this.$http.get(`users/${id}`)
      // console.log(dt)
      // 把获得好的修改用户信息赋予给editUser成员
      this.editUser = dt.data
      // 显示对话框
      this.editUserDialog = true
    },
    delUser(id) {
      this.$confirm('是否删除此条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: dt } = await this.$http.delete(`users/${id}`)
          console.log(dt)
          if (dt.meta.status != 200) {
            return this.$message.error(dt.meta.msg)
          }
          this.$message.success(dt.meta.msg)
          // 如果当前页码只有一条数据，并且不是第一页，那么请给当前页码做减1操作
          if (this.userList.length === 1 && this.querycdt.pagenum > 1) {
            this.querycdt.pagenum--
          }
          // 刷新操作
          this.getUserList()
        })
        .catch(() => {})
    },
    tianjia() {
      this.$refs.addUserRef.validate(async valid => {
        if (valid) {
          // 把添加好的各项表单域信息传递（axios）到服务器存储
          const { data: dt } = await this.$http.post('users', this.addUser)
          // console.log(dt)
          if (dt.meta.status !== 201) {
            return this.$message.error(dt.meta.msg)
          }

          this.$message.success(dt.meta.msg)
          this.addUserdialog = false
          this.getUserList()
        }
      })
    },
    // 每页条数变化的处理
    handleSizeChange(val) {
      // val:变化后的每页显示条数
      // console.log(val)
      // 把变化后的条数赋予给querycdt.pagesize
      this.querycdt.pagesize = val
      // 根据变化后的每页条数重新获得数据
      this.getUserList()
    },
    // 当前页页码变化的处理
    handleCurrentChange(val) {
      // val:变化后的页码
      // 设置变化页码和重新获得数据
      this.querycdt.pagenum = val
      this.getUserList()
    },
    // 获取用于显示真实的用户数据
    async getUserList() {
      const { data: dt } = await this.$http.get('users', {
        params: this.querycdt
      })
      // console.log(dt)
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      // 把获得的总记录条数的数目赋予给tot
      this.tot = dt.data.total
      this.userList = dt.data.users
    }
  },
  data() {
    // 为校验手机号码生成一个函数
    var checkMobile = (rule, value, callback) => {
      // 手机号码规则：1开始,后接3|5|8|9|7,再后边跟9位数字
      // 正则表达式校验
      if (!/^1[35789]\d{9}$/.test(value)) {
        // 校验失败(请给页面提示错误信息)
        return callback(new Error('手机号码格式不正确'))
      }
      // 校验成功，继续执行
      callback()
    }

    return {
      // 修改用户相关
      // 对话框是否显示
      editUserDialog: false,
      // 校验表单项目
      editUserRules: {
        mobile: [
          { required: true, message: '手机号码必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 表单数据对象
      editUser: {
        username: '',
        mobile: '',
        email: ''
      },
      // 添加用户相关
      // 表单验证部分
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },

      // 表单数据对象部分
      addUser: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserdialog: false,
      // 用户总记录条数
      tot: 0,
      // 声明用户列表成员
      userList: [],
      // 获取用户数据的条件参数
      querycdt: {
        query: '', // 被检索的模糊关键字
        pagenum: 1, // 当前页码设定【分页功能体现】
        pagesize: 3 // 设置每次获取3条记录【分页功能实现】
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
