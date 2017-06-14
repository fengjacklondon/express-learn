<template>
	<div id="div-nav" class="navbar navbar-static-top navbar-dark bg-inverse">
		<ul class="nav navbar-nav">
			<li class="nav-item"  v-for="menuItem ,index in menu">
				<a class="nav-link" :href="menuItem.link">{{menuItem.text}}</a>
			</li>
		</ul>
	</div>
</template>
<style type="text/css">
	#div-nav
	{
		margin-top: 10px; margin-bottom: 10px; background-color: #0099F0; 
	}
</style>
<script >
// import {mapState} from 'vuex'
export default {
  name: 'navigation',
  data () {
    return {
      menu: [
        {link: '#article', text: '文章'},
        {link: '#feature', text: '专题'},
        {link: '#manage', text: '管理'},
        {link: '#about', text: '关于'},
        {link: '#contact', text: '联系'}
      ]
    }
  }
}
</script>
