// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/lazy'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
// import '@/mock'
import fetch from './utils/fetch'
import store from './store'

Vue.prototype.$http = fetch
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Antd)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
  }
})
