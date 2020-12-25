const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,

  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  work_num: state => state.user.work_num,
  age: state => state.user.age,
  sex: state => state.user.sex,
  position: state => state.user.position,
  department: state => state.user.department,
  email: state => state.user.email,
  create_time: state => state.user.create_time,

  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
