import Vue from 'vue'
import Router from 'vue-router'
import PageView from '@/layouts/PageView'
import RouteView from '@/layouts/RouteView'
import MenuView from '@/layouts/MenuView'
import Login from '@/pages/login/Login'

Vue.use(Router)
const LOGIN_PAGE_NAME = '/login'
const routers = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: Login,
      invisible: true
    },
    {
      path: '/',
      name: '首页',
      component: MenuView,
      redirect: '/login',
      icon: 'none',
      invisible: true,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: RouteView,
          icon: 'dashboard',
          children: [
            {
              path: '/dashboard/analysis',
              name: '分析页',
              component: () => import('@/demopages/dashboard/Analysis'),
              icon: 'none'
            }
          ]
        },
        {
          path: '/form',
          name: '表单页',
          component: PageView,
          icon: 'form',
          children: [
            {
              path: '/form/basic',
              name: '基础表单',
              component: () => import('@/demopages/form/BasicForm'),
              icon: 'none'
            },
            {
              path: '/form/step',
              name: '分步表单',
              component: () => import('@/demopages/form/stepForm/StepForm'),
              icon: 'none'
            },
            {
              path: '/form/advanced',
              name: '高级表单',
              component: () => import('@/demopages/form/advancedForm/AdvancedForm'),
              icon: 'none'
            }
          ]
        },
        {
          path: '/list',
          name: '列表页',
          component: PageView,
          icon: 'table',
          children: [
            {
              path: '/list/query',
              name: '查询表格',
              component: () => import('@/demopages/list/QueryList'),
              icon: 'none'
            },
            {
              path: '/list/primary',
              name: '标准列表',
              component: () => import('@/demopages/list/StandardList'),
              icon: 'none'
            },
            {
              path: '/list/card',
              name: '卡片列表',
              component: () => import('@/demopages/list/CardList'),
              icon: 'none'
            },
            {
              path: '/list/search',
              name: '搜索列表',
              component: () => import('@/demopages/list/search/SearchLayout'),
              icon: 'none',
              children: [
                {
                  path: '/list/search/article',
                  name: '文章',
                  component: () => import('@/demopages/list/search/ArticleList'),
                  icon: 'none'
                },
                {
                  path: '/list/search/application',
                  name: '应用',
                  component: () => import('@/demopages/list/search/ApplicationList'),
                  icon: 'none'
                },
                {
                  path: '/list/search/project',
                  name: '项目',
                  component: () => import('@/demopages/list/search/ProjectList'),
                  icon: 'none'
                }
              ]
            }
          ]
        },
        {
          path: '/detail',
          name: '详情页',
          icon: 'profile',
          component: RouteView,
          children: [
            {
              path: '/detail/basic',
              name: '基础详情页',
              icon: 'none',
              component: () => import('@/demopages/detail/BasicDetail')
            },
            {
              path: '/detail/advanced',
              name: '高级详情页',
              icon: 'none',
              component: () => import('@/demopages/detail/AdvancedDetail')
            }
          ]
        },
        {
          path: '/result',
          name: '结果页',
          icon: 'check-circle-o',
          component: PageView,
          children: [
            {
              path: '/result/success',
              name: '成功',
              icon: 'none',
              component: () => import('@/pages/result/Success')
            },
            {
              path: '/result/error',
              name: '失败',
              icon: 'none',
              component: () => import('@/pages/result/Error')
            }
          ]
        },
        {
          path: '/exception',
          name: '异常页',
          icon: 'warning',
          component: RouteView,
          children: [
            {
              path: '/exception/404',
              name: '404',
              icon: 'none',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '/exception/403',
              name: '403',
              icon: 'none',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '/exception/500',
              name: '500',
              icon: 'none',
              component: () => import('@/pages/exception/500')
            }
          ]
        }
      ]
    }
  ]
})
routers.beforeEach((to, from, next) => {
  // iView.LoadingBar.start()
  const token = window.localStorage.getItem('token')
  if (!token && to.path !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      path: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.path === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.path === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      path: '/dashboard/analysis' // 跳转到home页
    })
  } else {
    next()
    // store.dispatch('getUserInfo').then(user => {
    //   // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
    //   if (canTurnTo(to.name, user.access, routes)) next() // 有权限，可访问
    //   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
    // })
  }
})

routers.afterEach(to => {
  // iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default routers
