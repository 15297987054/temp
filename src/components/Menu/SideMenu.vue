<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
    <!-- <logo /> -->
   <div class="userMes">
      <div class="userPic" >
        <img :src="avatar"/>
      </div>
      <span class="userName">{{userName}}</span>
      <span class="userIntroduction">{{userIntroduction}}</span>
   </div>
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"></s-menu>
  </a-layout-sider>

</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  data(){
    return{
      userName:"王梦华",
      userIntroduction:"深圳大区总经理"
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
<style lang="less">
    .userMes{
      width:100%;
      height:265px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .userPic{
        max-width:100px;
        max-height:100px;
        border-radius: 50px;
        img{
          width:100%;
        height:100%;
        border-radius: 50px;
        border:6px solid rgba(255,255,255,0.3);
        }
      }
      .userName{
        font-size:16px;
        margin-top:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:22px;
      }
      .userIntroduction{
        text-align: center;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:17px;
      }
    }
</style>