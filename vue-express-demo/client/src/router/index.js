import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/Navigation'
import Sider from '@/components/Sider'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default: Navigation,
        sider: Sider
      }
    }
  ]
})
