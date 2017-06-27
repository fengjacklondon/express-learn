<template>
  <div  class="col-lg-12">
	<div id="div-nav" class="navbar navbar-static-top navbar-dark bg-inverse">
  <a  class="navbar-brand" href="/">喜剧之王</a>
		<ul class="nav navbar-nav">
			<li class="nav-item"  v-for="menuItem ,index in menu">
      <!--  用href 页面会刷新，用router则不会<a class="nav-link" :href="menuItem.link" >{{menuItem.text}}</a> 
        应为这是个单页面应用 router 是在这个页面不同部分路由、
      -->
      <!--  不加native 无法触发 click 事件 -->
      <router-link v-bind:to="menuItem.link"  @click.native="changeItem">{{menuItem.text}}</router-link>
			</li>
		</ul>
  </div>
  <Location></Location>
  <Manage></Manage>
  <router-view ></router-view>
	</div>
 
</template>
<style type="text/css">
	#div-nav
	{
		margin-top: 10px; margin-bottom: 10px; background-color: #0099F0; 
	}

</style>
<script >
import Location from './Location'
import Manage from './Manage'
export default {
  name: 'navigation',
  data () {
    return {
      menu: [
        {link: '/article', text: '文章'},
        {link: '/feature', text: '专题'},
        {link: '/manage', text: '管理'},
        {link: '/about', text: '关于'},
        {link: '/contact', text: '联系'}
      ]
    }
  },
  components: {
    Location,
    Manage
  },
  methods: {
    changeItem: function (e) {
      console.log(e.target)
      var parentnavitem = {text: e.target.text, link: e.target.href}
      this.$store.dispatch('parentNavItemChange', parentnavitem)
    }
  }
}
</script>
