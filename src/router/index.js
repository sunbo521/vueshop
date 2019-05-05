import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import User from '@/components/User'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/welcome' }, // 默认执行welcome路由
    {
      path: '/home',
      component: Home,
      redirect: '/welcome', // 默认执行welcome路由
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: User }
      ]
    }
  ]
})

// 设置路由守卫
router.beforeEach((to, from, next) => {
  // /home路由需要token的存在支持（表示用户处于登录状态）
  var token = sessionStorage.getItem('token')
  // 用户处于非登录状态，就禁止访问除登录页以外的其他页面
  if (token === null && to.path !== '/login') {
    return next('/login')
  }
  next()
})
export default router
