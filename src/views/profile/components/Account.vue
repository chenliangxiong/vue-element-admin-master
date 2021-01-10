<template>
  <el-form>

    <el-row :gutter="50">
      <el-col :span="12">
        <el-form-item label="姓名">
          <el-input v-model.trim="user.name" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="邮箱">
          <el-input v-model.trim="user.email" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :span="12">
        <el-form-item label="性别">
          <br>
          <el-select v-model.trim="user.sex" placeholder="男">
            <el-option label="男" value="shanghai">男</el-option>
            <el-option label="女" value="beijing">女</el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="年龄">
          <el-input v-model.trim="user.age" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-tooltip class="item" effect="dark" content="点击修改你的信息" placement="bottom">
        <el-button type="primary" @click="submit">修改</el-button>
      </el-tooltip>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          role: '',
          email: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: '用户信息修改成功',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
