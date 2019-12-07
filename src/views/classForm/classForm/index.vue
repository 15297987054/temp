<template>
  <div class="page-header-index-wide">
    <!-- <a-card :bordered="false" :bodyStyle="{ padding: '16px 0',width:'100%', height: '100%' }" :style="{ height: '100%' }" /> -->

    <div class="class_container">
      <div class="account-settings-info-main" :class="device">
            <div class="account-settings-info-left">
              <a-menu
                mode="horizontal"
                :style="{border: '0', width: device == 'mobile' ? '560px' : '100%',}"
                :selectedKeys="selectedKeys"
                class="menu_box"
                type="inner"
                @openChange="onOpenChange"
              >
                <a-menu-item key="/classForm/classForm/all" @click="itemClick" :class="'/classForm/classForm/all'==itemId ? 'menuItem':''">
                  <router-link :to="{ name: 'all' }">全部</router-link>
                </a-menu-item>
                <a-menu-item key="/classForm/classForm/byClassRoom" @click="itemClick" :class="[{'menuItem':'/classForm/classForm/byClassRoom' == itemId},'']">
                  <router-link :to="{ name: 'byClassRoom' }">按教室</router-link>
                </a-menu-item>
                <a-menu-item key="/classForm/classForm/byTeacher" @click="itemClick" :class="[{'menuItem':'/classForm/classForm/byTeacher' == itemId},'']">
                  <router-link :to="{ name: 'byTeacher' }">按老师</router-link>
                </a-menu-item>
                <a-menu-item key="/classForm/classForm/byClass" @click="itemClick" :class="[{'menuItem':'/classForm/classForm/byClass' == itemId},'']">
                  <router-link :to="{ name: 'byClass' }">按班级</router-link>
                </a-menu-item>
              </a-menu>
            </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title"></div>
          <route-view></route-view>
        </div>
      </div>
      <!-- </a-card> -->
    </div>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { mixinDevice } from '@/utils/mixin.js'

export default {
  name: 'ClassForm',
  components: {
    RouteView,
    PageView
  },
  mixins: [mixinDevice],
  data() {
    return {
      // horizontal  inline
      mode: 'inline',

      openKeys: [],
      selectedKeys: [],
      itemId:"/classForm/classForm/all",

      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },

      pageTitle: ''
    }
  },
  created() {
    this.updateMenu()
    this.itemId=sessionStorage.getItem("itemId")
  },
  methods: {
    itemClick({key}){
      
      this.itemId=key;
      sessionStorage.setItem("itemId",this.itemId)
      console.log(key,this.itemId)
    },
    onOpenChange(openKeys) {
      this.openKeys = openKeys
    },
    updateMenu() {
      const routes = this.$route.matched.concat()
      this.selectedKeys = [routes.pop().path]
      // console.log('selectedKeys', this.selectedKeys)
    }
  },
  watch: {
    $route(val) {
      this.updateMenu()
    }
  }
}
</script>

<style lang="less" scoped>
@import "./antTableStyle/table.less";
.class_container {
  border-radius: 8px;
  padding: 20px;
  margin: -24px;
  background: white;
}
.account-settings-info-main {
  width: 100%;
  height: 100%;
  overflow: auto;

  &.mobile {
    display: block;

    .account-settings-info-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 50px;
      overflow-x: auto;
      overflow-y: scroll;
    }
    .account-settings-info-right {
      padding: 20px 40px;
    }
  }
.menuItem{
  color: #1890ff !important;
  background-color: #e6f7ff;
  border-bottom: 2px solid #1890ff;
}
  .account-settings-info-left {
    border-bottom:1px solid #ccc;
    width: 100%;
    .menu_box {
      width: 100%;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 30px;
      display: flex;
      align-items: center;
      border-radius: 8px 8px 0 0;
      height: 34px;
    }
  }

  .account-settings-info-right {
    flex: 1 1;
    width: 100%;
    padding: 8px 20px;

    .account-settings-info-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }
    .account-settings-info-view {
      padding-top: 12px;
    }
  }
}
</style>
