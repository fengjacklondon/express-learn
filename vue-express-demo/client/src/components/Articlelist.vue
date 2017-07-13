<template>
  <div id="mangage-aticle" v-show="isShow">
    <div  id="manage-toobar">
      <button class="btn btn-primary" type="submit" @click="all">
        全部&nbsp<i class="fa fa-list" aria-hidden="true"></i>
      </button>
      <button class="btn btn-primary" type="submit" data-toggle="modal" 
      data-target="#manage-edit--aticle" @click="add">
        添加&nbsp<i class="fa fa-plus" aria-hidden="true"></i>
      </button>
      <button class="btn btn-primary" type="submit" @click="del">
        删除&nbsp<i class="fa fa-times" aria-hidden="true"></i>
      </button>
      <button class="btn btn-primary" type="submit" @click="search">
        搜索&nbsp<i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </div> 
    
    <div class="modal fade"  id="manage-edit--aticle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" v-show="currentToolbar == 'add'">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            </button>
            <h4  class="modal-title" id="myModalLabel">编辑文章</h4>
          </div>
          <div class="modal-body">
            <ArticleEdit></ArticleEdit>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <Pagination parentshow="管理" childshow="文章" trigger="articleCardListpageChange" current="articleCurrentPage" v-show="currentToolbar != 'add'"></Pagination>   
  </div>
</template>
<script >
  import {mapState} from 'vuex'
  import ArticleEdit from './ArticleEdit'
  import Pagination from './Pagination'
  export default {
    data () {
      return {
        currentToolbar: 'all'
      }
    },
    computed: mapState({
      isShow: state => (state.parentNavItem.text === '管理') && (state.manageParentNavItem.text === '文章')
    }),
    components: {
      ArticleEdit, Pagination
    },
    methods: {
      all: function () {

      },
      add: function () {
        console.log(888)
        this.currentToolbar = 'add'
      },
      del: function () {

      },
      search: function () {

      },
      editArticle: function () {

      },
      delArticle: function () {

      }
    }
  }
</script>
