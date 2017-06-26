import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    parentNavItem: {text: '文章', link: '/article'},
    childNavItem: {text: '全部', link: '#'},
    loginState: false,
    msg: 'kkk',
    msgType: 'info',
    msgBoxIsShow: false,
    msgText: '',
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
       /* 这里是登录后的跳转 可以 crud 用户，文章，专题，评论 */
      context.commit('getBlogState', 1)
      if (!context.state.loginState) {
        context.commit('showMessage', {type: 'err', text: '登录失败'})
      }
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
    },

    getBlogState (state, days) {
      console.log('store getBlogState' + days)
      Vue.http.get(`/api?action=blog-state&days=${days}`).then((response) => {
        var data = response.body
        if (!data.err) {
          console.log(data.result.visitorCount)
          state.blogState[1].value = data.result.visitorCount
          state.blogState[2].value = data.result.discussCount
          console.log(JSON.stringify(state.blogState))
        }
      })
    },
    showMessage (state, message) {
      console.log('show message')
      state.msgBoxIsShow = true
      state.msgType = message.type
      state.msgText = message.text
      setTimeout(function () {
        state.msgBoxIsShow = false
      }, 2000)
    }
  }
})
