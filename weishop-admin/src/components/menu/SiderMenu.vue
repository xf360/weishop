<template>
  <a-layout-sider :class="[theme, 'sider', isMobile ? null : 'shadow']" width="220" :collapsible="collapsible"
    v-model="collapsed" :trigger="null">
    <!-- <div class="sider-fixed" :style="{width:sidewidth}"> -->
    <div :class="['logo', theme]">
      <router-link to="/">
        <!-- <img src="static/img/vue-antd-logo.png"> -->
        <h1 >{{systemName}}</h1>
      </router-link>
    </div>
    <i-menu :theme="theme" :collapsed="collapsed" :menuData="menuData" @select="onSelect" />
    <!-- </div> -->
  </a-layout-sider>
</template>

<script>
  import IMenu from './menu'
  export default {
    name: 'SiderMenu',
    components: {
      IMenu
    },
    props: {
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
      menuData: {
        type: Array,
        required: true
      },
      theme: {
        type: String,
        required: false,
        default: 'dark'
      }
    },
    computed: {
      isMobile() {
        return this.$store.state.setting.isMobile
      },
      systemName() {
        return this.$store.state.setting.systemName
      },
      sidewidth(){
        if(this.collapsed)
        {
          return '80px';
        }else{
          return '220px';
        }
      }
    },
    methods: {
      onSelect(obj) {
        this.$emit('menuSelect', obj)
      }
    }
  }

</script>

<style lang="less" scoped>
  .shadow {
    box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  }
.sider-fixed{
  position: fixed;
}
  .sider {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: auto;

    &.light {
      background-color: #fff;
    }

    &.dark {
      background-color: #001529;
    }

    .logo {
      height: 64px;
      position: relative;
      line-height: 64px;
      padding-left: 24px;
      -webkit-transition: all .3s;
      transition: all .3s;
      overflow: hidden;

      &.light {
        background-color: #fff;

        h1 {
          color: #1890ff;
        }
      }

      &.dark {
        background-color: #002140;

        h1 {
          color: #fff;
        }
      }

      h1 {
        color: #fff;
        font-size: 16px;
        margin: 0 0 0 12px;

        font-weight: 600;
        display: inline-block;
        height: 32px;
        line-height: 32px;
        vertical-align: middle;
      }

      img {
        width: 32px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  //隐藏滚动条，但可以滚动
  .sider::-webkit-scrollbar {
    display: none;
  }

</style>
