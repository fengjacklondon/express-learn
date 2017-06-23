import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    parentNavItem: {text: '文章', link: '/article'},
    childNavItem: {text: '全部', link: '#'},
    msg: 'kkk',
    msgType: 'info',
    loginState: false,
    count: '9999',
    conf: {
      website: {
        title: '喜剧之王'
      }
    }
  },
  actions: {
    parentNavItemChange (context, parentNavItem) {
      context.commit('parentNavItemChange', parentNavItem)
    },
    count (context) {
      console.log('575775')
      Vue.http.get('/api').then((response) => {
        console.log('111111' + response)
        context.commit('countRecord', 'mock')
      })
    },
    login (context, user) {
      context.commit('login', user)
    }
  },
  mutations: {
    parentNavItemChange (state, parentNavItem) {
      console.log(' store mutations ')
      state.parentNavItem = parentNavItem
      state.childNavItem = {text: '全部', link: '#'}
    },
    countRecord (state, mock) {
      state.count = mock
    },
    login (state, user) {
      console.log(user)
      Vue.http.get(`/api?action=user-login&name=${user.name}&password=${user.password}`).then((response) => {
        var data = response.body
        // response.json(response.body)
        console.log(data)
        console.log(10000)
        if (!data.err) {
          state.user = user
          state.msgType = 'success'
          state.loginState = true
        } else {
          state.loginState = false
          state.msgType = 'err'
        }
      })
    }
  }
})
