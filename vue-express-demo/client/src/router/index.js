import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Navigation from '@/components/Navigation'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default: Hello,
        navigation: Navigation
      }
    }
  ]
})
