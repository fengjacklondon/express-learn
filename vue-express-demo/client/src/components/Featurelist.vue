<template>
  <div  id="feature-list"  v-show="isShow">
    <div id="feature-toobar"  >
      <button class="btn btn-primary" type="submit" @click="all">全部&nbsp<i class="fa fa-list" aria-hidden="true"></i></button>
      <button class="btn btn-primary" type="submit" @click="add">增加&nbsp<i class="fa fa-plus" aria-hidden="true"></i></button>
      <button class="btn btn-primary" type="submit" @click="del">删除&nbsp<i class="fa fa-times" aria-hidden="true"></i></button>
      <button class="btn btn-primary" type="submit" @click="search">查询&nbsp<i class="fa fa-search" aria-hidden="true"></i></button>
    </div>
    <FeatureEdit v-show="currentToolbar == 'add' "></FeatureEdit>
    <ul class="list-group" v-show="currentToolbar !='add'">
      <li class="list-group-item" v-for="featureItem in featureList" style="height: 50px;">
        <div class="col-lg-4">
          <a href="#"><i class="fa fa-1x fa-archive" aria-hidden="true"></i>{{featureItem.title}}</a>
        </div>

        <div class="col-lg-4">
          <a href="#"><i class="fa fa-1x fa-user" aria-hidden="true"></i>{{featureItem.author}}</a>
        </div>
        <span class="col-lg-2">
          <a href="#"><i class="fa fa-1x fa-file"  aria-hidden="true"></i>{{featureItem.countArticle}}</a>
        </span>
        <div class="btn-group col-lg-1">
          <button type="button" class="btn btn-secondary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-1x fa-cog" aria-hidden="true"></i></button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              <i class="fa fa-1x fa-eye" aria-hidden="true"></i>
              预览
            </a>
            <a class="dropdown-item"  href="#" @click="editFeature(featureItem)">
              <i class="fa fa-1x fa-pencil-square-0" aria-hidden="true"></i>
              编辑
            </a>
            <a  class="dropdown-item" href="#"  @click="delFeature(featureItem.id)">
              <i class="fa fa-1x fa-times" aria-hidden="true"></i>
              删除
            </a>
          </div>
        </div>
      </li>
    </ul>
    <Pagination parentshow="管理" childshow="专题" trigger="featureCardListPageChange"

    current="featureCurrentPage" v-show="currentToolbar != 'add'"></Pagination>
  </div>
</template>
<style  type="text/css">
  input {
    display: inline
  }

  select
{
  height:30px; line-height:30px;
}
</style>
<script >
 import {mapState} from 'vuex'
 import FeatureEdit from './FeatureEdit.vue'
 import Pagination from './Pagination'
 export default{
   data () {
     return {
       currentToolbar: 'all'
     }
   },
   computed: mapState({
     featureList: state => state.featureCardList,
     isShow: state => (state.parentNavItem.text === '管理') && (state.manageParentNavItem.text === '专题')
   }),
   components: {
     FeatureEdit, Pagination
   },
   methods: {
     all: function () {
       this.currentToolbar = 'all'
     },
     add: function () {
       this.currentToolbar = 'add'
       this.$store.dispatch('featureCardChange', this.$store.state.featureCurrent)
     },
     del: function () {
       this.currentToolbar = 'del'
     },
     // 参数括号 与方法括号分开
     search: function () {
       this.currentToolbar = 'search'
     },
     editFeature: function (feature) {
       this.$store.state.isFeatureEdit = true
       this.currentToolbar = 'add'
       this.$store.dispatch('featureCardChange', feature)
     },
     delFeature: function (featureId) {
       this.$store.dispatch('delFeature', featureId)
       this.$store.dispatch('featureCardListPageChange', this.$store.state.featureCurrentPage)
     }
   }
 }

</script>
