import Vue from 'vue';

import App from './App';
import fetch from './utils/fetch'
import { Notify } from 'vant';
Vue.use(Notify);
import { router } from './router';
import store from './store/index.js';
Vue.prototype.$http = fetch;
import area from './utils/area.js'

Vue.filter('area', function (code) {
if(area.province_list[code]){
  return area.province_list[code]
}else{
  if(area.city_list[code]){
    return area.city_list[code];
  }
  else{
    if(area.county_list[code])
    {
      return area.county_list[code]
    }
    return '';
  }
}
});
Vue.filter('dateformat', function (value, fmt) {
  if (value instanceof Date) {
    value = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`
  }
  if (value === '-') {
    return '-'
  }
  if (!value) {
    return ''
  }
  if (!fmt) {
    fmt = 'yyyy-MM-dd hh:mm:ss'
  }
  // var date = new Date(value);
  // if (!date) {
  var timestr = value.replace(/-/g, '/').replace('T', ' ')
  if (timestr.indexOf('.') !== -1) {
    timestr = timestr.slice(0, timestr.indexOf('.'))
  }
  var date = new Date(timestr) // 获取一个时间对象  注意：如果是uinx时间戳记得乘以1000。比如php函数time()获得的时间戳就要乘于1000
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
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
})
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
