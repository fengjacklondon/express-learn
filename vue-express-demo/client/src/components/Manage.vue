<template>
  <div id="div-manage" class="col-lg-9" v-show="isShow">
    <div class="col-lg-3">
      <SideBar></SideBar>
    </div>
    <div class="col-lg-9">
    <DashBoard></DashBoard>
    </div>
    <div class="col-lg-9">
    <Userlist></Userlist>
    </div>
    <div class="col-lg-9">
      <Articlelist></Articlelist>
    </div>
    <div class="col-lg-9">
      <FeatureList></FeatureList>
    </div>
    <div class="col-lg-9">
      <Discusslist></Discusslist>
    </div>
    <div class="col-lg-9">
      <Visitorlist></Visitorlist>
    </div>
    <div class="col-lg-9">
      <System></System>
    </div>
  </div>
</template>

<script>
import { mapState} from 'vuex'
import SideBar from './SiderbarMenu.vue'
import DashBoard from './Dashboard'
import Userlist from './Userlist.vue'
import Articlelist from  './Articlelist.vue'
import FeatureList from  './FeatureList.vue'
import Discusslist from   './Discusslist.vue'
import Visitorlist from  './Visitorlist.vue'
import  System from  './System.vue'
export default {
  computed: mapState ({
    isShow: state => (state.parentNavItem.text == '管理' ) && (state.loginState)
  }),
  components: {
    SideBar, DashBoard, Userlist, Articlelist, FeatureList, Discusslist , Visitorlist, System
  }
}
</script>
