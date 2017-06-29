<template>
  <div  id="manage-userlist" v-show="isShow" >
      <button  type="submit" class="btn btn-primary" @click="all">全部&nbsp;<em class="fa fa-list" aria-hidden="true"></em></button>
      <button  type="submit" class="btn btn-primary" @click="add">增加&nbsp;<b class="fa fa-plus-circle"></b></button>
      <button  type="submit" class="btn btn-primary" @click="del">删除&nbsp<i class="fa fa-times"></i></button>
      <button  type="submit" class="btn btn-primary" @click="search">查询&nbsp<i class="fa fa-search"></i></button>
      <ul  class="list-group" >
        <li class="list-group-item" v-for="userItem in userList">
          <div></div>
          <div></div>
          <div></div>
          <div>
            <button></button>
            <div></div>
          </div>
        </li>
      </ul>
  </div>
</template>
<script >
import {mapState} from 'vuex'
export default {
  computed: mapState({
    userList: state => state.userList,
    isShow: state => (state.parentNavItem.text === '管理') && (state.manageParentNavItem.text === '用户')
  }),
  methods: {
    all: function () {

    },
    add: function () {

    },
    del: function () {

    },
    search: function () {

    }
  }
}
</script>
