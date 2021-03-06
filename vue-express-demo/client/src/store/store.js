import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Vuex)
export default new Vuex.Store({
  state: {

    debug: true,
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
      name: '', nickname: '', password: '', quertion: '', anser: '', authority: '', timeCreate: ''
    },
    isUserUpdate: false,
    articleCurrent: {
      id: '',
      featureID: '',
      title: '',
      subtitle: '',
      link: '',
      author: '',
      introduction: '',
      coverLink: '',
      content: '',
      countRead: 0,
      countShare: 0,
      countDiscuss: 0,
      labels: ''
    },
    articleCardList: '',
    articlePerPage: 6,
    articleCurrentPage: 1,
    articleSearchCurrentPage: 1,
    articleSearchText: '',
    isArticleUpdate: false,
    featureList: '',
    featureCardList: '',
    featurePerPage: 6,
    featureCurrentPage: 1,
    featureCurrent: {
      id: '', title: '', timeCreate: '', author: '', introduction: '', countArticle: 0
    },
    isFeatureUpdate: false
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
    articleCardListPageChange (context, userCard) {
      console.log('articleCard ')
      context.commit('articleCardListPageChange', userCard)
    },
    featureCardListPageChange (context, featureCard) {
      context.commit('featureCardListPageChange', featureCard)
    },
    updateUser (context, user) {
      console.log('store updateuser  userInfo:' + user)
      context.commit('updateUser', user)
      if (context.state.msgType === 'success') {
        context.commit('showMessage', {type: 'success', text: '修改用户成功'})
      } else {
        context.commit('showMessage', {type: 'err', text: '修改用户失败'})
      }
    },
    addUser (context, user) {
      context.commit('addUser', user)
    },
    delUser (context, username) {
      context.commit('delUser', username)
    },
    addArticle (context, article) {
      context.commit('addArticle', article)
    },
    updateArticle (context, article) {
      context.commit('updateArticle', article)
    },
    delArticle (context, articleId) {
      context.commit('delArticle', articleId)
    },
    featureCardChange (context, featureCard) {
      context.commit('featureCardChange', featureCard)
    },
    updateFeature (context, feature) {
      context.commit('updateFeature', feature)
    },
    addFeature (context, feature) {
      context.commit('addFeature', feature)
    },
    delFeature (context, featureId) {
      context.commit('delFeature', featureId)
    },
    getFeatureList (context) {
      context.commit('getFeatureList')
    },
    articleCardChange (context, articleCard) {
      context.commit('articleCardChange', articleCard)
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
    articleCardListPageChange (state, page) {
      var from = (page - 1) * state.articlePerPage
      var count = state.articlePerPage
      console.log('传递的页数是：' + from + count)
      Vue.http.get(`/article?action=article-range&from=${from}&count=${count}`).then((response) => {
        var data = response.body
        console.log('user data:' + data)
        if (!data.err && data.result.length) {
          state.articleCurrentPage = page
          state.articleCardList = data.result
        } else {
          console.assert(state.debug, '获取文章信息失败')
        }
      })
    },
    featureCardListPageChange (state, page) {
      debugger
      console.log('进入专题 mutattion' + page)
      var from = (page - 1) * state.featurePerPage
      var count = state.featurePerPage
      console.log('分页查询' + from + '到' + count)
      Vue.http.get(`feature?action=feature-range&from=${from}&count=${count}`).then((response) => {
        var data = response.body
        console.log('feature data:' + data)
        if (!data.err && data.result.length) {
          state.featureCurrentPage = page
          state.featureCardList = data.result
        } else {
          console.assert(state.debug, '获取专题数据失败')
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
    articleCardChange (state, articleCard) {
      state.articleCurrent = articleCard
    },
    updateUser (state, user) {
      Vue.http.put(`api?action=user-edit`, {user: user}).then((response) => {
        var data = response.body
        if (!data.err) {
          state.msgType = 'success'
        }
      })
    },
    addUser (state, user) {
      Vue.http.put(`api?action=user-add`, {user: user}).then((response) => {
        var data = response.body
        if (!data.err) {
          state.msgType = 'success'
        }
      })
    },
    delUser (state, name) {
      Vue.http.put(`api?action=user-del`, {name: name}).then((response) => {
        var data = response.body
        if (!data.err) {
          state.msgType = 'success'
        }
      })
    },
    addArticle (state, article) {
      Vue.http.put(`api?action=article-add`, {article: article}).then((response) => {
        var data = response.body
        if (!data.err) {
          state.msgType = 'success'
        }
      })
    },
    updateArticle (state, article) {
      Vue.http.put(`api?action=article-update`, {article: article}).then((response) => {
        var data = response.body
        if (!data.err) {
          state.msgType = 'success'
        }
      })
    },
    delArticle (state, articleId) {
      Vue.http.put(`api?action=article-del`, {articleId: articleId}).then((response) => {
        var data = response.body
        if (!data.err) {
          state.msgType = 'success'
        }
      })
    },
    featureCardChange (state, featureCard) {
      state.featureCurrent = featureCard
    },
    updateFeature (state, feature) {
      Vue.http.put(`api?action=feature-add`, {feature: feature}).then((response) => {
        var data = response.body
        if (!data.err) {
          state.msgType = 'success'
        }
      })
    },
    addFeature (state, feature) {
      Vue.http.put(`api?action=feature-update`, {feature: feature}).then((response) => {
        var data = response.body
        if (!data.err) {
          state.msgType = 'success'
        }
      })
    },
    delFeature (state, featureId) {
      Vue.http.put(`api?action=feature-del`, {featureId: featureId}).then((response) => {
        var data = response.body
        if (!data.err) {
          state.msgType = 'success'
        }
      })
    },
    getFeatureList (state) {
      Vue.http.get(`feature?action=feature-list`).then((response) => {
        console.assert(state.debug, response.body)
        var data = response.body
        if (!data.err && data.result.length) {
          console.log('获取的专题数据是:' + data.result)
          state.featureList = data.result
          state.featureList.timeCreate = new Date(state.featureList.timeCreate)
        } else {
          console.assert(state.DEBUG, '获取专题数据失败')
        }
      })
    }
  }
})

