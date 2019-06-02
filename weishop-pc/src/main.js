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
import area from './utils/area'

Vue.prototype.$http = fetch
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Antd)

// type:0,所有  type:1 省   type:2市 type:3县
Vue.filter('areaname', function (value, type) {
  if (!value) {
    return ''
  }
  if (!type) {
    type = 0
  }
  var province = null
  var city = null
  var country = null
  var ret = ''
  switch (type) {
    case 0:
      var pcode = value.substr(0, 2) + '0000'
      province = area.filter((ite) => ite.value === pcode)[0]
      if (province) {
        ret = province.label
        var ccode = value.substr(0, 4) + '00'
        city = province.children.filter((ite) => ite.value === ccode)[0]
        if (city) {
          ret = ret + city.label
          country = city.children.filter((ite) => ite.value === value)[0]
          if (country) {
            ret = ret + country.label
          }
        }
        return ret
      } else {
        return ''
      }
    case 1:
      province = area.filter((ite) => ite.value === value)[0]
      if (province) {
        return province.label
      } else {
        return ''
      }
    case 2:
      pcode = value.substr(0, 2) + '0000'
      province = area.filter((ite) => ite.value === pcode)[0]
      if (province) {
        ccode = value.substr(0, 4) + '00'
        city = province.children.filter((ite) => ite.value === ccode)[0]
        if (city) {
          return city.label
        }
        return ''
      } else {
        return ''
      }
    case 3:
      pcode = value.substr(0, 2) + '0000'
      province = area.filter((ite) => ite.value === pcode)[0]
      if (province) {
        ccode = value.substr(0, 4) + '00'
        city = province.children.filter((ite) => ite.value === ccode)[0]
        if (city) {
          country = city.children.filter((ite) => ite.value === value)[0]
          if (country) {
            return country.label
          }
        }
        return ''
      } else {
        return ''
      }
  }
  return ''
})
Vue.filter('fileparse', function (value) {
  var ret = []
  if (value instanceof Array) {
    if (value && value.length > 0) {
      for (var i in value) {
        var tem = {
          id: '',
          name: '',
          status: '',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
        ret.push(tem)
      }
    }
    return ret;
  } else if (value instanceof Object) {
    return [{
      uid: value.id,
      name: value.fileName,
      status: '',
      url: Vue.prototype.$http.api + 'api/AbpFile/Show?id=' + value.id
    }]
  }
  return []
})

Vue.filter('payType', function (value) {
  switch (value) {
    case 1:
      return '支付宝'
    case 2:
      return '银行转账'
    default:
      return '未知'
  }
})
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
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  mounted () {}
})
