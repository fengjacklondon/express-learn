<template>
<div id="div-articleedit"  class="col-lg-12">
        <form>
          <fieldset class="form-group">
            <div class="col-lg-4">
              <label for="input-title">标题</label>
              <input type="text" class="form-control" placeholder="标题"  v-model="newArticle.title">
            </div>
            <div  class="col-lg-6">
              <label for="input-subtitle">副标题 </label>
              <input type="text" class="form-control" placeholder="副标题" v-model="newArticle.subtitle" style="font-size: 80%">
            </div>
          </fieldset>

          <fieldset class="form-group">
            <div class="col-lg-4">
              <label for="select-feature">所属专题</label>
              <select class="form-control " v-model="newArticle.featureID">
                <option :value="featureItem.id" v-for="featureItem in featureList">{{featureItem.title}}</option>
              </select>
            </div>
            <div class="col-lg-8">
              <label for="input-link">链接</label>
            </div>
          </fieldset>
        </form>
</div>
</template>
<script >
  import {mapState} from 'vuex'
  export default {
    computed: mapState({
      newArticle: state => state.articleCurrent,
      featureList: state => state.featureList

    }),
    methods: {
      isUpdate: function () {
        return this.$store.state.isArticleUpdate
      }
    }
  }
</script>
