import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    msg: 'kkk',
    count: '9999'
  },
  actions: {
    count (context) {
      console.log('575775')
      Vue.http.get('/api').then((response) => {
        console.log('111111' + response)
        context.commit('countRecord', 'mock')
      })
    }
  },
  mutations: {
    countRecord (state, mock) {
      state.count = mock
    }
  }
})
