// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store/store'

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
  components: { App }
})
