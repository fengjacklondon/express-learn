<template>
<div id="div-about" class="col-lg-9" v-show="isShow">
    <div id="div-about--content" class="jumbotron">
    <h5 class="display-4 text-center">关于</h5>
    <div style="color:#006DE0">
        <p class="lead"><b>知行合一</b>2017年07月26日22:30:55</p>
        <p class="lead">为善去恶致良知</p>
        <p class="lead"><b>昨夜西风凋碧树，独山高楼，望断天涯路，衣带渐宽终不悔，为伊消得人憔悴，蓦然回首那人却在灯火阑珊处</b></p>
        <hr class="m-y-md">
        </div>
        <p>(the answer to life, the universe, and everything)</p>
    </div>
</div>
</template>
<style type="text/css">
#div-about--content
{
  background-color: #FFF; padding-top: 5px; height: 450px;
}
</style>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    isShow: state => state.parentNavItem.text === '关于'
  })
}
</script>

