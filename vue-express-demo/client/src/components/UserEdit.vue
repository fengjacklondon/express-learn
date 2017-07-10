<template>
<div id="manage-edituser" class="col-lg-12">
  <form class="col-lg-12">
    <fieldset class="form-group col-lg-8">
      <small class="text-muted">用户名</small>
      <input type="text" class="form-control" placeholder="用户名" v-model="newUser.name">
      <small class="text-muted">昵称</small>
      <input type="text" class="form-control" placeholder="昵称" v-model="newUser.nickname">
    </fieldset>
    <fieldset class="form-group col-lg-10" v-show="!isUpdate()">
      <small class="text-muted">密码</small>
      <input type="passoword"  class="form-control" placeholder="密码" v-model="newUser.password">
      <small class="text-muted">确认密码</small>
      <input type="passoword" class="form-control"   placeholder="再次输入密码">
      <small class="text-muted">问题</small>
      <input type="text" class="form-control"  placeholder="密保问题" v-model="newUser.question">
      <small class="text-muted">答案</small>
      <input type="text"  class="form-control" placeholder="密码答案" v-model="newUser.anser">
    </fieldset>

    <fieldset class="form-group col-lg-5">
      <small class="text-muted">用户类型</small>
      <select class="form-control" v-model="newUser.authority">
        <option value="website">全站</option>
        <option value="feature">专题</option>
        <option value="article">文章</option>
      </select>
    </fieldset>
    <fieldset class="form-group col-lg-3 col-lg-offset-9">
      <button type="button" class="btn btn-primary"  @click="editUser()">{{isUpdate()?'更新':'添加'}}用户</button>
    </fieldset>
  </form>
</div>
</template>

<script >
  import {mapState} from 'vuex'
  export default {
    computed: mapState({
      newUser: state => state.userCurrent
    }),
    methods: {
      // 确认下   state 发生了变化， method方法 会不会变化
      isUpdate: function () {
        console.log('是否调用了这个更新方法' + this.$store.state.isUserUpdate)
        return this.$store.state.isUserUpdate
      },
      editUser: function () {
        if (this.isUpdate()) {
          console.log('更新')
          this.$store.dispatch('updateUser', this.newUser)
        } else {
          console.log('新增')
          this.$store.dispatch('addUser', this.newUser)
        }
      }
    }
  }
</script>

