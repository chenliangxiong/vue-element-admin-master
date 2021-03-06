import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // meta: {
    //   title: '主页',
    //   icon: 'dashboard'
    // roles: ['1', '2', '3', '4', '5']
    // },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '主页', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['1', '2', '3'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['1'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['1']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // 招聘管理
  {
    path: '/recruit',
    component: Layout,
    redirect: '/recruit/index',
    meta: {
      title: '招聘管理',
      icon: 'people',
      roles: ['1', '2']
    },
    children: [
      {
        path: 'recruit',
        component: () => import('@/views/recruit/index'),
        name: 'recruit',
        meta: { title: '竞聘的人', icon: 'example', roles: ['1', '2'] }
      },
      {
        path: 'new_job',
        component: () => import('@/views/recruit/new_job'),
        name: 'recruit',
        meta: { title: '发布招聘', icon: 'edit', roles: ['1', '2'] }
      }
      // {
      //   path: 'job_list',
      //   component: () => import('@/views/recruit/job_list'),
      //   name: 'recruit',
      //   meta: { title: '工作列表', icon: 'list', roles: ['1', '2'] }
      // }
    ]
  },

  // 培训管理
  // {
  //   path: '/train',
  //   component: Layout,
  //   redirect: '/train/index',
  //   roles: ['1'],
  //   meta: {
  //     title: '培训管理',
  //     icon: 'skill',
  //     roles: ['1']
  //   },
  //   children: [
  //     {
  //       path: 'train',
  //       component: () => import('@/views/train/index'),
  //       name: 'train',
  //       meta: { title: '培训管理', icon: 'skill', roles: ['1'] }
  //     }
  //   ]
  // },

  // 绩效管理
  {
    path: '/achievements',
    component: Layout,
    redirect: '/achievements/index',
    // roles: ['1'],
    meta: {
      title: '绩效管理',
      roles: ['1', '2', '3', '4'],
      icon: 'star'
    },
    children: [
      {
        path: 'achievements',
        component: () => import('@/views/achievements/index'),
        name: 'achievements',
        meta: { title: '绩效管理', icon: 'star', roles: ['1', '2', '3'] }
      },
      {
        path: 'staffAchievements',
        component: () => import('@/views/achievements/staffAchievements'),
        name: 'staffAchievements',
        meta: { title: '查看绩效', icon: 'star', roles: ['4'] }
      }
    ]
  },

  // 薪酬管理
  {
    path: '/wages',
    component: Layout,
    redirect: '/wages/index',
    meta: {
      title: '薪酬管理',
      roles: ['1', '2', '3', '4'],
      icon: 'money'
    },
    children: [
      {
        path: 'wages',
        component: () => import('@/views/wages/index'),
        name: 'wages',
        meta: { title: '薪酬管理', icon: 'money', roles: ['1', '2'] }
      },
      {
        path: 'staffWages',
        component: () => import('@/views/wages/staffWages'),
        name: 'staffWages',
        meta: { title: '工资明细', noCache: true, roles: ['3', '4'] }
      }
    ]
  },

  // 部门管理
  {
    path: '/department',
    roles: ['1', '2', '3'],
    component: Layout,
    redirect: '/department/index',
    meta: {
      title: '部门管理',
      roles: ['1', '2', '3'],
      icon: 'component'
    },
    children: [
      {
        path: 'department',
        component: () => import('@/views/department/index'),
        name: 'department',
        meta: { title: '部门管理', icon: 'component', roles: ['1', '2', '3'] }
      }
    ]
  },

  // 权限管理
  {
    path: '/jurisdiction',
    component: Layout,
    redirect: '/jurisdiction/index',
    roles: ['1'],
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['1']
    },
    children: [
      {
        path: 'jurisdiction',
        component: () => import('@/views/jurisdiction/index'),
        name: 'jurisdiction',
        meta: { title: '员工权限管理', roles: ['1'] }
      }
      // {
      //   path: 'jurisdiction',
      //   component: () => import('@/views/jurisdiction/index'),
      //   name: 'jurisdiction',
      //   meta: { title: '权限设置', roles: ['1'] }
      // }
    ]
  },

  // 查看员工信息

  {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    meta: {
      title: '查看员工信息',
      icon: 'peoples'
    },
    children: [
      {
        path: 'users',
        component: () => import('@/views/users/index'),
        name: 'users',
        meta: {
          title: '员工信息表',
          icon: 'peoples',
          roles: ['1', '2']
        }
      },
      {
        path: 'users',
        component: () => import('@/views/users/staffUsers'),
        name: 'staffUsers',
        meta: {
          title: '查看员工信息',
          icon: 'peoples',
          roles: ['3', '4', '5']
        }
      }
    ]
  },
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: '访问错误页面',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
