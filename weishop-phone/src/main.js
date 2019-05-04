import Vue from 'vue';

import App from './App';
import fetch from './utils/fetch'
import { Notify } from 'vant';
Vue.use(Notify);
import { router } from './router';
import store from './store/index.js';
Vue.prototype.$http = fetch
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
