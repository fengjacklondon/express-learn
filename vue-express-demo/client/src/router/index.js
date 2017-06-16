import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/Navigation'
import Sider from '@/components/Sider'
import Location from '@/components/Location'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default: Navigation,
        location: Location,
        sider: Sider
      }
    }
  ]
})
