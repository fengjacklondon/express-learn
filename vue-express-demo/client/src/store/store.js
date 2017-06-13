import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex)
Vue.use(VueResource)
export default new Vuex.Store({
  state: {
    msg: 'kkk',
    count: '9999'
  },
  actions: {
    count (context) {
      console.log('575775')
      context.commit('countRecord', 'mock')
    }
  },
  mutations: {
    countRecord (state, mock) {
      state.count = mock
    }
  }
})
