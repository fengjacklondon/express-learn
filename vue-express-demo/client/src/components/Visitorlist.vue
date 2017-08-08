<template>
  <div id="div-visitor-list">
    <div id="div-visitor-toolbar">
      <button  class="btn btn-primary" type="submit" @click="all"><i class="fa fa-list"></i>全部</button>
      <button class="btn btn-primary" type="submit"><i class="fa fa-times"></i>删除</button>
      <button class="btn btn-primary" type="submit"><i class="fa fa-search"></i>搜索</button>
    </div>
    <ul  class="list-group" v-show="currentToolbar != 'add'">
      <li class="list-group-item" v-for="visitorItem in visitorList">
        <div class="col-lg-5">
          <a href="#"><i class="fa fa-1x fa-clock-o"></i>{{new Date(visitorItem.timeVisited).toLocaleString()}}</a>
        </div>
        <div class="col-lg-3">
          <a href="#" :title="getBrowserVersion(visitorItem.ua)"><i class="fa fa-1x fa-desktop"></i>{{getOSName(visitorItem.ua)}}</a>
        </div>
        <div class="col-lg-3">
          <a href="#" :title="getBrowserVersion(visitorItem.ua)"><i class="fa fa-1x fa-globe"></i>{{getBrowserName(visitorItem.ua)}}</a>
        </div>
        <div class="col-lg-1">
          <button type="button"  class="btn btn-secondart btn-sm"  title="删除"  @click="delVisitor(visitorItem.id)">
            <i  class="fa fa-1x fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>
    <Pagination parentshow="管理"  childshow="访客"  trigger="visitorCardListPageChange"  current="visitorCurrentPage" v-show="currentToolbar != 'add'"></Pagination>
  </div>
</template>
<script >
import { mapState } from 'vuex'
import Pagination from './Pagination'
var parser = require('../other/ua-parse.min.js')
export default {
  data () {
    return {
      currentToolbar: 'all'
    }
  },
  computed: mapState({
    visitorList: state => state.visitorCardList,
    isShow: state => (state.parentNavItem.text === '管理') && (state.manageParentNavItem.text === '访客')
  }),
  components: {
    Pagination
  },
  methods: {
    all: function () {
      this.currentToolbar = 'add'
    },
    del: function () {
      this.currentToolbar = 'del'
    },
    search: function () {
      this.currentToolbar = 'search'
    },
    delVisitor: function (visitorId) {
      this.$store.dispatch('delVisitor', visitorId)
      this.$store.dispathch('visitorCardListPageChange', this.$store.state.visitorCurrentPage)
    },
    getOSName (ua) {
      var u = parser(ua)
      return u.os.name
    },
    getOSVersion (ua) {
      var u = parser(ua)
      return u.os.version
    },
    getBrowserName (ua) {
      var u = parser(ua)
      return u.browser.name
    },
    getBrowserVersion (ua) {
      var u = parser(ua)
      return u.browser.version
    }
  }
}
</script>

