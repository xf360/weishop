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

Vue.filter('payType', function (value) {
  switch (value) {
    case 0:
      return '支付宝';
    case 1:
      return '银行转账';
    default:
      return '未知';
  }
});
Vue.filter('dateformat', function (value, fmt) {
  if (value instanceof Date) {
    value = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`;
  }
  if (value === '-') {
    return '-';
  }
  if (!value) {
    return '';
  }
  if (!fmt) {
    fmt = 'yyyy-MM-dd hh:mm:ss';
  }
  // var date = new Date(value);
  // if (!date) {
  var timestr = value.replace(/-/g, '/').replace('T', ' ');
  if (timestr.indexOf('.') !== -1) {
    timestr = timestr.slice(0, timestr.indexOf('.'));
  }
  var date = new Date(timestr); // 获取一个时间对象  注意：如果是uinx时间戳记得乘以1000。比如php函数time()获得的时间戳就要乘于1000
  // }

  // value = Date.parse(value)
  // var time = new Date(timestr);

  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }
  return fmt;
});
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  mounted() {}
})
