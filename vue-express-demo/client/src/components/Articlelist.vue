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

<ul class="list-group" v-show="currentToolbar !='add'">
  <li class="list-group-item" v-for="articleItem in articleList" style="height: 50px; margin: 0 autp">
    <div  class="col-lg-4">
      <a href="#"> <i class="fa fa-1x fa-file"></i>{{articleItem.title + articleItem.subtitle}}</a>
    </div>
    <div class="col-lg-4">
      <a href="#"><i class="fa fa-1x fa-user"></i>{{articleItem.author}}</a>
    </div>
    <span class="col-lg-2">
      <a href="#"><i class="fa fa-1x fa-archive"></i>{{articleItem.featureID}}</a>
    </span>
    <div class="btn-group col-lg-1">
      <button  type="button"  class="btn btn-secondary dropdown-toggle btn-sm" data-toggle="dropdown" >
        <i class="fa fa-1x fa-cog">          
        </i>
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">
          <i class="fa fa-1x fa-eye"></i>预览
        </a>  
        <a  class="dropdown-item" href="#" data-toggle="modal" data-target="manage-edit--aticle" @click="editArticle(articleItem)">
          <i class="fa fa-1x fa-pencil-square-o"></i>编辑
        </a>
        <a class="dropdown-item" href="#"  @click="delArticle(articleItem.id)">
          <i class="fa fa-1x fa-times"></i>删除
        </a>
      </div>
    </div>
  </li>

</ul>
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
      articleList: state => state.articleCardList,
      isShow: state => (state.parentNavItem.text === '管理') && (state.manageParentNavItem.text === '文章')
    }),
    components: {
      ArticleEdit, Pagination
    },
    methods: {
      all: function () {
        this.currentToolbar = 'all'
        this.$store.dispatch('articleCardListPageChange', 1)
      },
      add: function () {
        console.log(888)
        this.$store.state.isArticleUpdate = false
        // 取得专题的数据
        this.$store.commit('getFeatureList')
        this.currentToolbar = 'add'
        this.$store.dispatch('articleCardChange', {id: '', featureID: '', title: '', subtitle: '', link: '', author: '', introduction: '', coverLink: '', content: '', countRead: 0, countShare: 0, countDiscuss: 0, labels: ''})
      },
      del: function () {

      },
      search: function () {

      },
      editArticle: function () {

      },
      delArticle: function (articleId) {
        this.$store.dispatch('delArticle', articleId)
        this.$store.dispatch('articleCardListPageChange', this.$store.state.articleCurrentPage)
      }
    }
  }
</script>
