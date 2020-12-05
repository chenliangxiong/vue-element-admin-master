<template>
  <div class="top">
    <el-card class="box-card">
      <el-form
        ref="form"
        :model="form"
        :rules="registerRules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item aria-label="" label="工号">
              <el-input v-model="form.job_num" name="job_num">你好</el-input>
            </el-form-item></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item aria-label="" label="姓名">
              <el-input v-model="form.name">你好</el-input>
            </el-form-item></el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="年龄">
              <el-input v-model="form.age">你好</el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="男">
                <el-option label="男" value="shanghai">男</el-option>
                <el-option label="女" value="beijing">女</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="部门">
          <el-select v-model="form.department" placeholder="请选择所在部门">
            <el-option label="区域一" value="shanghai">你好</el-option>
            <el-option label="区域二" value="beijing">你好</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="form.position" placeholder="请选择你的职位">
            <el-option label="区域一" value="shanghai">你好</el-option>
            <el-option label="区域二" value="beijing">你好</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            v-model="form.introduction"
            type="textarea"
            placeholder="你好，我是"
          >1</el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.native.prevent="handleRegister"
          >注册</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  data() {
    const validateJobNum = (rule, value, callback) => {
      if (value.length !== 10) {
        callback(new Error('工号必须是十位'))
      } else {
        callback()
      }
    }
    return {
      form: {
        job_num: '',
        name: '',
        age: '',
        sex: '',
        position: '',
        department: '',
        introduction: ''
      },
      registerRules: {
        job_num: [{ required: true, trigger: 'blur', validator: validateJobNum }]
      }
    }
  },
  methods: {
    handleRegister() {
    // console.log(JSON.stringify(this.loginForm))
      this.$refs.form.validate(valid => {
      // console.log(JSON.stringify(this.valid))
        if (valid) {
          register({ form: this.form }).then(response => {
            console.log('注册成功')
            // data是利用api从后端获取的数据
            // 从response中拿到data
            // const { data } = response
            // commit('SET_TOKEN', data.token)
            // setToken(data.token)
            // // console.log(data.token)
            // // console.log(data.roles)

            // resolve()
          }).catch(error => {
            console.log('没拿到response')
            console.log(error)
          })
        // console.log(JSON.stringify(this.loginForm))
          // this.loading = true
          // this.$store.dispatch含有异步操作，例如向后台提交数据       第一步把值传给store里的login函数
          // this.$store.dispatch('user/register', this.form)
          //   .then(() => {
          //   // 第三步！！
          //     this.$router.push('/login')
          //     this.loading = false
          //   })
          //   .catch(() => {
          //     console.log('运行到这里')
          //     this.loading = false
          //   })
        } else {
          console.log('错误提交!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.top {
  padding: 30px;
}
.box-card {
  width: 480px;
  margin: 0 auto;
}
</style>
