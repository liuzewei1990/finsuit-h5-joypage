import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      name: 'index',
      path: '/',
      component: require('../view/main').default,
      meta: { title: '随机红包送给你', requiresAuth: true, keepAlive: true },
      // redirect: "/",
    },
    {
      name: 'shareIndex',
      path: '/shareIndex',
      component: require('../view/shareIndex/index.vue').default,
      meta: { title: '分享图片页面', requiresAuth: false, keepAlive: true },
      // redirect: "/",
    },
    {
      name: 'login',
      path: '/login',
      component: require('../view/login/index.vue').default,
        meta: { title: '随机红包送给你', requiresAuth: false, keepAlive: false },
      // redirect: "/",
    },
    {
      name: 'rule',
      path: '/rule',
      component: require('../view/rule/index.vue').default,
      meta: { title: '活动规则', requiresAuth: false, keepAlive: true },
      // redirect: "/",
    },
  ]
})


export default router
