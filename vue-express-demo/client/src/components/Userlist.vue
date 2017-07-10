<template>
<div id="div-manager-userlist">
  <div id="manage-userlist-toolbar" v-show="isShow" >
      <button  type="submit" class="btn btn-primary" @click="all">全部&nbsp;<em class="fa fa-list" aria-hidden="true"></em></button>
      <button  type="submit" class="btn btn-primary" @click="add">增加&nbsp;<b class="fa fa-plus-circle"></b></button>
      <button  type="submit" class="btn btn-primary" @click="del">删除&nbsp<i class="fa fa-times"></i></button>
      <button  type="submit" class="btn btn-primary" @click="search">查询&nbsp<i class="fa fa-search"></i></button>
  </div>
  <Useredit v-show="currentToolbar == 'add'"></Useredit>
      <ul  class="list-group"  v-show="currentToolbar != 'add'">
        <li class="list-group-item" v-for="userItem in userList">
          <div class="col-lg-4"><a href="#">{{userItem.name}}</a></div>
          <div class="col-lg-3"><a href="#"><i class="fa fa-1x fa-user"></i>{{userItem.nickname}}</a></div>
          <div class="col-lg-3"><a href="#"><i class="fa fa-1x fa-child"></i>{{userItem.authority}}</a></div>
          <div class="btn-group">
            <button type="button" class="btn btn-secondary dropdown-toggle btn-sm"  data-toggle="dropdown"><i class="fa fa-1x fa-cog"></i></button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#" >
                <i class="fa fa-1x fa-eye"></i>
                预览
              </a>
              <a class="dropdown-item" @click="editUser(userItem)"><i class="fa fa-1x fa-pencil-square-o"></i>编辑</a>
              <a class="dropdown-item" @click="delUser(userItem.name)"><i class="fa fa-1x fa-times"></i>删除</a>
            </div>
          </div>
        </li>
      </ul>
      <Pagination parentshow="管理" childshow="用户"  trigger="userListPageChange" current="userCurrentPage" v-show="currentToolbar != 'add'"></Pagination>
  </div>
</template>
<script >
import {mapState} from 'vuex'
import Useredit from './Useredit'
import Pagination from './Pagination'
export default {
  data () {
    return {currentToolbar: 'all'}
  },
  computed: mapState({
    userList: state => state.userList,
    isShow: state => (state.parentNavItem.text === '管理') && (state.manageParentNavItem.text === '用户')
  }),
  components: {
    Useredit,
    Pagination
  },
  methods: {
    all: function () {
      this.currentToolbar = 'all'
    },
    add: function () {
      console.log('添加用户')
      this.$store.state.isUserUpdate = false
      this.currentToolbar = 'add'
      this.$store.dispatch('userCardChange', {
        id: 0, author: '', contact: '', discussID: '', timeCreate: '', content: '', type: '', state: '', mask: ''
      })
    },
    del: function () {
      this.currentToolbar = 'del'
    },
    search: function () {
      this.currentToolbar = 'search'
    },
    delUser: function (name) {
      this.$store.dispatch('delUser', name)
      this.$store.dispatch('userListPageChange', this.$store.state.userCurrentPage)
    },
    editUser: function (user) {
      this.$store.state.isUserUpdate = true
      this.currentToolbar = 'add'
      this.$store.dispatch('userCardChange', user)
    }

  }
}
</script>

