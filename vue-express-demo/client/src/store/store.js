import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    manageParentNavItem: {text: '仪表盘'},
    parentNavItem: {text: '文章', link: '/article'},
    childNavItem: {text: '全部', link: '#'},
    loginState: false,
    msg: 'kkk',
    msgType: 'info',
    msgBoxIsShow: false,
    userPerPage: 6,
    msgText: '',
    count: '9999',
    userList: '',
    blogState: [
      {icon: 'fa-rss', title: '新订阅', value: '0', style: {color: '#006DE0'}},
      {icon: 'fa-users', title: '新访客', value: '0', style: {color: '#429AFE'}},
      {icon: 'fa-commenting', title: '新评论', value: '0', style: {color: '#03D1FF'}}
    ],
    conf: {
      website: {
        title: '喜剧之王'
      }
    },
    userCurrent: {
      name: '', nickname: '', password: '', quertion: '', anser: '', authority: ''
    }
  },
  actions: {
    parentNavItemChange (context, parentNavItem) {
      context.commit('parentNavItemChange', parentNavItem)
    },
    manageParentNavItemChange (context, manageParentNavItem) {
      context.commit('manageParentNavItemChange', manageParentNavItem)
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
    },
    userListPageChange (context, page) {
      context.commit('userListPageChange', page)
    },
    childNavItemChange (context, childNavItem) {
      context.commit('childNavItemChange', childNavItem)
    },
    getBlogState (context, days) {
      console.log(' 获取博客状态')
      context.commit('getBlogState', days)
    },
    userCardChange (context, userCard) {
      context.commit('userCardChange', userCard)
    },
    updateUser (context, user) {
      context.commit('updateUser', user)
      if (context.state.msgType === 'success') {
        context.commit('showMessage', {type: 'success', text: '修改用户成功'})
      } else {
        context.commit('showMessage' {type: 'err', text: '修改用户失败'})
      }
    },
    addUser (context, user) {
      comtext.comtext('addUser', user)
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
    },
    userListPageChange (state, page) {
      var from = (page - 1) * state.userPerPage
      var count = state.userPerPage
      Vue.http.get(`/api?action=user-range&from=${from}&count=${count}`).then((response) => {
        var data = response.body
        console.log('user data:' + data)
        if (!data.err && data.result.length) {
          state.userCurrentPage = page
          state.userList = data.result
        } else {
          console.assert(state.debug, '获取用户数据失败')
        }
      })
    },
    childNavItemChange (state, childNavItem) {
      state.childNavItem = childNavItem
    },
    manageParentNavItemChange (state, manageParentNavItem) {
      state.manageParentNavItem = manageParentNavItem
    },
    userCardChange (state, userCard) {
      state.userCurrent = userCard
    },
    updateUser (state, user) {
      Vue.http.put(`api?action=user-edit`, {user: user}).then((response) => {
        var data = response.body
        if(!data.err){
          state.msgType = 'success'
        }
      })
    },
    addUser (state, user) {
      Vue.http.put(`api?action=user-add`,{user: user}).then((response) => {
        var data = response.body
        if(!data.err){
          state.msgType = 'success'
        }
      })
    }
  }
})

