<template>
<div class="col-lg-6 text-center">
  <form  class="form-horizontal">
    <div class="form-group">
      <label for="exampleInputName">{{loginState}}</label>
      <input type="text" class="form-control" id="exampleInputName1" placeholder="Name" v-model="user.name">
    </div>
     <div class="form-group">
      <label for="examplePassword">Name</label>
      <input type="text" class="form-control" id="examplePassword" placeholder="Password" v-model="user.password">
    </div>
    <button type="submit" class="btn btn-default" @click="login()">Submit</button>
  </form>
</div>
</template>
<style type="text/css">
#div-login-logo
{
  color: #0099F0; width: 90px; height: 90px; margin-top: 5px; padding-top: 10px;
}
#div-form, .input-group
{
  margin-top: 15px;
}

.card-border{
    border: .0625rem solid #e5e5e5;

 }
</style>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  computed: mapState({
    loginState: state => state.loginState
  }),
  methods: {
    login: function () {
      console.log('6666')
      this.$store.dispatch('login', this.user)
    }
  }
}
</script>

