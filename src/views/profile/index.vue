<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <!-- <el-tab-pane label="论坛" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="工作历程" name="timeline">
                <timeline />
              </el-tab-pane> -->
              <el-tab-pane label="修改信息" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
// import Activity from './components/Activity'
// import Timeline from './components/Timeline'
import Account from './components/Account'
// import { getWorkNum } from '@/utils/auth'
// import { getUser } from '@/api/users'

export default {
  name: 'Profile',
  // components: { UserCard, Activity, Timeline, Account },
  components: { UserCard, Account },
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'work_num',
      'age',
      'sex',
      'avatar',
      'position',
      'department',
      'email',
      'create_time'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
    //   getUser({ 'work_num': getWorkNum() }).then(res => {
    //     this.user = res.data
    //     this.user.roles = this.user.roles.join(' | ')
    //     console.log(this.user)
    //   })
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        work_num: this.work_num,
        age: this.age,
        sex: this.sex,
        avatar: this.avatar,
        position: this.position,
        department: this.department,
        email: this.email,
        create_time: this.create_time
        // avatar: this.avatar,
        // position: this.position,
        // email: this.email
      }
      // console.log(this.user)
      // res.data.data.forEach(function(e) {
      //   // console.log(e.status)
      //   if (e.status === 1) {
      //     e.status = '已激活'
      //   } else if (e.status === 0) {
      //     e.status = '未激活'
      //   } else {
      //     e.status = '已锁定'
      //   }
      // })
      // this.user = {
      //   name: res.data.name,
      //   role: res.data.roles.join(' | '),
      //   work_num: res.data.work_num,
      //   age: res.data.age,
      //   sex: res.data.sex,
      //   avatar: res.data.avatar,
      //   position: res.data.position,
      //   department: res.data.department,
      //   email: res.data.email,
      //   create_time: res.data.create_time
      // }
    }
  }
}
</script>
