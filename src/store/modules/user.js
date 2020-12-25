import { login, logout, getInfo, checkLoginCode } from '@/api/user'
import { getToken, setToken, removeToken, setWorkNum } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  work_num: '',
  age: '',
  sex: '',
  position: '',
  department: '',
  email: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_WORK_NUM: (state, work_num) => {
    state.work_num = work_num
  },
  SET_AGE: (state, age) => {
    state.age = age
  },
  SET_SEX: (state, sex) => {
    state.sex = sex
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_POSITION: (state, position) => {
    state.position = position
  },
  SET_DEPARTMENT: (state, department) => {
    state.department = department
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_CREATE_TIME: (state, create_time) => {
    state.create_time = create_time
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login          ！！第二步
  // console.log(JSON.stringify(this.loginForm))

  login({ commit }, userInfo) {
    const { work_num, password } = userInfo
    // Promise根据resolve（true）,reject（false）执行后面的语句
    return new Promise((resolve, reject) => {
      // console.log(JSON.stringify(name))
      login({ work_num: work_num.trim(), password: password })
        .then(response => {
          // data是利用api从后端获取的数据
          // 从response中拿到data
          const { data } = response
          if (data.code === 2) {
            reject('noAccount')
          }

          setWorkNum(data.work_num)

          // 在这里修改验证条件
          const isAdmin = data.roles < 1
          if (isAdmin) {
            reject('isAdmin')
          }

          commit('SET_TOKEN', data.token)

          setToken(data.token)
          // console.log(data.token)
          // console.log(data.roles)

          resolve()
        })
        .catch(error => {
          console.log('没拿到response')
          reject(error)
        })
    })
  },

  checkLoginCode({ commit }, userInfo) {
    const { work_num, code } = userInfo
    // console.log(code)
    // Promise根据resolve（true）,reject（false）执行后面的语句
    return new Promise((resolve, reject) => {
      // console.log(JSON.stringify(name))
      checkLoginCode({ work_num: work_num, code: code })
        .then(response => {
          // data是利用api从后端获取的数据
          // 从response中拿到data
          const { data } = response
          if (!data.code) {
            reject(data.code)
          }
          // setWorkNum(data.work_num)
          // const isAdmin = data.roles < 2
          // if (isAdmin) {
          //   reject('isAdmin')
          // }

          commit('SET_TOKEN', data.token)

          setToken(data.token)
          // console.log(data.token)
          // console.log(data.roles)

          resolve()
        })
        .catch(error => {
          console.log('没拿到response')
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    // console.log(state.token)

    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          // console.log(state.token)
          const { data } = response
          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { roles, name, avatar, introduction, age, sex, position, work_num, email, create_time, department } = data

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          if (roles === [1]) {
            // const dialog = true
            return false
          }

          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_AGE', age)
          commit('SET_SEX', sex)
          commit('SET_POSITION', position)
          commit('SET_WORK_NUM', work_num)
          commit('SET_EMAIL', email)
          commit('SET_CREATE_TIME', create_time)
          commit('SET_DEPARTMENT', department)
          commit('SET_INTRODUCTION', introduction)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch('tagsView/delAllViews', null, { root: true })

          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
