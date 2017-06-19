import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/Navigation'
import Sider from '@/components/Sider'

Vue.use(Router)
export default new Router({
  routes: [
    { path: '/',
      component: Navigation,
      children: [
      {path: 'article', component: Sider},
      {path: 'feature', component: Sider},
      {path: 'manage', component: Sider},
      {path: 'about', component: Sider},
      {path: 'contact', component: Sider}

      ]
    }
  ]
})
