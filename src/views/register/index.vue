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
          <el-select v-model="form.department" placeholder="请选择">
            <el-option
              v-for="item in responseDepartment"
              :key="item.department"
              :label="item.department"
              :value="item.department"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="form.position" placeholder="请选择">
            <el-option
              v-for="item in responsePosition"
              :key="item.position"
              :label="item.position"
              :value="item.position"
            />
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
// import { register } from '@/api/user'
import { departmentList, positionList } from '@/api/register'

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
        department: [],
        introduction: ''
      },
      responseDepartment: {},
      responsePosition: {},
      // department: '',
      registerRules: {
        job_num: [{ required: true, trigger: 'blur', validator: validateJobNum }]
      }
    }
  },
  created() {
    this.getOption()
  },
  methods: {
    getOption() {
      departmentList().then(res => {
        console.log(res.data)
        this.responseDepartment = res.data
        // res.data.forEach(function(item, index) {
        //   this.form.department[index] = item.department
        // })
      })
      positionList().then(res => {
        console.log(res.data)
        this.responsePosition = res.data
      })
    },
    handleRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // register({ form: this.form }).then(response => {
          //   console.log('注册成功')
          // }).catch(error => {
          //   console.log('没拿到response')
          //   console.log(error)
          // })
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
