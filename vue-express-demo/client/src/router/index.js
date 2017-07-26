import Vue from 'vue'
import Router from 'vue-router'
import Navigation from '@/components/Navigation'
// import Sider from '@/components/SidebarMenu'
import Login from '@/components/Login'
import ArticleCardList from '@/components/ArticleCardList'
import FeatureCardList from '@/components/FeatureCardList'
import AboutMe from '@/components/AboutMe'
import ContactMe from '@/components/ContactMe'

Vue.use(Router)
export default new Router({
  routes: [
    { path: '/',
      component: Navigation,
      children: [
      {path: 'article', component: ArticleCardList},
      {path: 'feature', component: FeatureCardList},
      {path: 'manage', component: Login},
      {path: 'about', component: AboutMe},
      {path: 'contact', component: ContactMe}

      ]
    }
  ]
})
