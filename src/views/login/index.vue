<template>
  <div>
    <el-dialog title="检测到你登录账号的权限比较高，请进行邮箱验证" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-input v-model="form.emailCode" placeholder="请输入验证码" class="input-with-select">
          <el-button slot="append" @click.native.prevent="sendEmail">发送</el-button>
        </el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="chackLoginCode">确 定</el-button>
      </div>
    </el-dialog>
    <div class="login-container">

      <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">人力资源管理系统</h3>
        </div>

        <el-form-item prop="work_num">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="work_num"
            v-model="loginForm.work_num"
            placeholder="请输入工号"
            name="work_num"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

        <div style="position:relative">
          <div class="tips">
            <span style="margin-right:18px;">还没有注册？
              <router-link style="color:yellow" :to="`/register`">点击注册</router-link>
            </span>
          </div>

          <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
            第三方登录
          </el-button>
        </div>
      </el-form>

      <el-dialog title="Or connect with" :visible.sync="showDialog">
        <social-sign />
      </el-dialog>
    </div>
  </div>

</template>

<script>
// import { validUsername } from '@/utils/validate'
// SocialSign 社交组件
import { sendLoginCode } from '@/api/user'
import SocialSign from './components/SocialSignin'
// import { getToken, setToken, removeToken, setWorkNum } from '@/utils/auth'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    // 表单验证规则
    // const validateUsername = (rule, value, callback) => {
    //   // console.log(value)

    //   if (!validUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于六位'))
      } else {
        callback()
      }
    }
    // 传值（loginForm,loginRules,passwordType,capsTooltip,loading,showDialog,redirect,otherQuery)
    return {
      dialogFormVisible: false,
      form: {
        emailCode: ''
      },
      loginForm: {
        work_num: '2017107203',
        password: '111111'
      },
      loginRules: {
        // name: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      // redirect重定向
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    sendEmail() {
      return new Promise((resolve, reject) => {
        sendLoginCode({ work_num: this.loginForm.work_num })
          .then(response => {
            this.$notify({
              title: '成功',
              message: '发送成功',
              type: 'success'
            })
            resolve()
          })
          .catch(error => {
            console.log('发送失败')
            reject(error)
          })
      })
    },

    chackLoginCode() {
      // console.log(JSON.stringify(this.loginForm))
      // this.$store.dispatch含有异步操作，例如向后台提交数据       第一步把值传给store里的login函数
      this.$store.dispatch('user/checkLoginCode', { code: this.form.emailCode, work_num: this.loginForm.work_num })
        .then((res) => {
          console.log(res)
          if (res === false) {
            console.log('slkdfjl')
          }
          // 第三步！！
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        })
        .catch(() => {
          this.$notify.error({
            title: '错误',
            message: '验证码错误'
          })
        })
    },

    handleLogin() {
      // console.log(JSON.stringify(this.loginForm))

      this.$refs.loginForm.validate(valid => {
        // console.log(JSON.stringify(this.valid))

        if (valid) {
          // console.log(JSON.stringify(this.loginForm))
          this.loading = true
          // this.$store.dispatch含有异步操作，例如向后台提交数据       第一步把值传给store里的login函数
          this.$store.dispatch('user/login', this.loginForm)
            .then((res) => {
              console.log(res)
              if (res === false) {
                console.log('slkdfjl')
              }

              // 第三步！！
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch((error) => {
              if (error === 'noAccount') {
                this.$notify.error({
                  title: '错误',
                  message: '账户未激活或者已锁定'
                })
                return false
              }
              if (error === 'isAdmin') {
                this.dialogFormVisible = true
                this.loading = false

                return false
              }
              console.log('在第三步失败', error)
              this.loading = false
            })
        } else {
          console.log('错误提交!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      height: 47px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    height: 600px;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

</style>
