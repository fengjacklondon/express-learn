<template>
  <div id="div-manage--editfeature" class="col-lg-12">
  <form class="col-lg-12">
    <input type="text" class="form-control" placeholder="专题名" size=20 v-model="newFeature.title">
    <input type="text" class="form-control" placeholder="作者" size=20 v-model="newFeature.author">
    <input type="text" class="form-control" placeholder="封面图片链接" size=20 v-model="newFeature.coverLink">
    <label>专题简介</label>
    <textarea  class="form-control" rows="3" placeholder="专题简介" v-model="newFeature.introduction"></textarea> 
    <fieldset class="from-group col-lg-offset-9" style="margin-top:10px">
      <button type="button" class="btn btn-primary" @click="editFeature">{{isUpdate()?'更新':'添加'}}专题</button>
    </fieldset>
  </form> 
  </div>
</template>
<script >
  import {mapState} from 'vuex'
  export default {
    computed: mapState({
      newFeature: state => state.featureCurrent
    }),
    methods: {
      isUpdate: function () {
        return this.$store.state.isFeatureUpdate
      },
      editFeature: function () {
        if (this.isUpdate) {
          this.$store.dispatch('updateFeature', this.newFeature)
        } else {
          this.$store.dispatch('addFeature', this.newFeature)
        }
        console.log(JSON.stringify(this.newFeature))
      }
    }
  }
</script>

