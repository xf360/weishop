<template>
  <a-layout>
    <drawer v-if="isMobile" :openDrawer="collapsed" @change="onDrawerChange">
      <sider-menu :theme="theme" :menuData="menuData" :collapsed="false" :collapsible="false"
        @menuSelect="onMenuSelect" />
    </drawer>
    <sider-menu :theme="theme" v-else-if="layout === 'side'" :menuData="menuData" :collapsed="collapsed"
      :collapsible="true" />
    <!-- <drawer :open-drawer="showSetting" placement="right" @change="onSettingDrawerChange">
      <div class="setting" slot="handler">
        <a-icon :type="showSetting ? 'close' : 'setting'" />
      </div>
      <setting />
    </drawer> -->
    <a-layout class="fixlayout" :style="{left:contentleft}">
      <global-header class="fixheader" :style="{left:contentleft}" :menuData="menuData" :collapsed="collapsed"
        @toggleCollapse="toggleCollapse" />
      <a-layout-content class="fixcontent"
        :style="{backgroundColor:'#fff', left:contentleft, minHeight: minHeight, padding: '12px 12px 0'}">
        <slot></slot>
      </a-layout-content>
      <!-- <a-layout-footer style="padding: 0px">
        <global-footer :link-list="linkList" :copyright="copyright" />
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script>
  import GlobalHeader from './GlobalHeader'
  import GlobalFooter from './GlobalFooter'
  import Drawer from '../components/tool/Drawer'
  import SiderMenu from '../components/menu/SiderMenu'
  import Setting from '../components/setting/Setting'

  const minHeight = window.innerHeight - 64 - 24 - 122

  let menuData = []

  export default {
    name: 'GlobalLayout',
    components: {
      Setting,
      SiderMenu,
      Drawer,
      GlobalFooter,
      GlobalHeader
    },
    data() {
      return {
        minHeight: minHeight + 'px',
        collapsed: false,
        menuData: menuData,
        showSetting: false
      }
    },
    computed: {
      isMobile() {
        return this.$store.state.setting.isMobile
      },
      theme() {
        return this.$store.state.setting.theme
      },
      layout() {
        return this.$store.state.setting.layout
      },
      linkList() {
        return this.$store.state.setting.footerLinks
      },
      copyright() {
        return this.$store.state.setting.copyright
      },
      contentleft() {
        if (this.collapsed) {
          return '80px';
        } else {
          return '220px';
        }
      }
    },
    methods: {
      toggleCollapse() {
        this.collapsed = !this.collapsed
      },
      onDrawerChange(show) {
        this.collapsed = show
      },
      onMenuSelect() {
        this.toggleCollapse()
      },
      onSettingDrawerChange(val) {
        this.showSetting = val
      }
    },
    async beforeCreate() {
      //读取路由配置为菜单
      var menu = this.$router.options.routes.find((item) => item.path === '/').children;
      var config = await this.$http.Get('/AbpUserConfiguration/GetAll');
      if (config.success) {
        var grantedPermissions = config.result.auth.grantedPermissions
        function a(item) {
          var t = JSON.parse(JSON.stringify(item));
          if (item.children && item.children.length > 0) {
            t.children = [];
            for (var i in item.children) {
              var ret = a(item.children[i]);
              if (ret) {
                t.children.push(ret);
              }
            }
            if (t.children.length > 0) {
              return t;
            } else {
              return null;
            }
          } else {
            if (item.permiss && grantedPermissions[item.permiss]) {
              return t;
            } else {
              return null;
            }
          }
        }
        this.menuData = [];
        for (var i in menu) {
          var ret = a(menu[i])
          if (ret) {
            this.menuData.push(ret);
          }
        }
        if(!this.menuData||this.menuData.length==0){
          this.$message.error('你没有权限登录后台。')
          window.localStorage.removeItem("token")
          this.$router.push('/login');
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .setting {
    background-color: #1890ff;
    color: #fff;
    border-radius: 5px 0 0 5px;
    line-height: 40px;
    font-size: 22px;
    width: 40px;
    height: 40px;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  }

  .fixlayout {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .fixheader {
    position: fixed !important;
    top: 0;
    right: 0;

  }

  .fixcontent {
    position: fixed !important;
    top: 66px;
    right: 0;
    bottom: 0;
    overflow: auto;
  }

  //隐藏滚动条，但可以滚动
  .fixcontent::-webkit-scrollbar {
    display: none;
  }
</style>