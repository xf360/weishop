import Vue from 'vue';

import App from './App';
import fetch from './utils/fetch'
import { Notify } from 'vant';
Vue.use(Notify);
import { router } from './router';
Vue.prototype.$http = fetch
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
