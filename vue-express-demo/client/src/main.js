// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store/store'
/* import Navigation from './components/Navigation'
import Sider from './components/Sider'
import Location from './components/Location' */
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false
/* 添加后解决  Cannot read property 'post' of undefined 报错问题 */
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  VueResource,
  template: '<App/>',
  // components: {App, Navigation, Location, Sider}
  components: {App}
})
