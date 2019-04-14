
import {
  Modal
} from 'ant-design-vue'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://dev.rhpass.com:8091/'
axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  if (!/^(ws|http)s?:\/\/?/.test(config.url)) {
    if (config.url.indexOf('/') !== 0) {
      config.url = '/' + config.url
    }
  }
  if (config.url === '/api/TokenAuth/Authenticate') {} else {
    var token = window.localStorage.getItem('token')
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
    } else {
      // vm.$router.push("/login");
      // window.location.href = window.location.pathname + '#/login'
    }
    // 在发送请求之前做些什么
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  var modal = Modal
  switch (error.response.status) {
    case 400:
      var content = ''
      if (error.response.data.error.validationErrors) {
        content = error.response.data.error.validationErrors[0].message + ':' + error.response.data.error.validationErrors[0].members.join(',')
      } else {
        content = error.response.data.error.details
      }
      modal.error({
        title: error.response.data.error.message,
        content: content
      })
      break
    case 401:
      window.localStorage.removeItem('token')
      window.location.href = window.location.pathname + '#/login'
      modal.error({
        title: '请求失败',
        content: '登陆信息已失效，请重新登陆。'
      })
      return Promise.reject(error)
    case 403:
      break
    case 404:
      modal.error({
        title: '数据未找到-404',
        content: error.response.data.error.code !== 0 ? error.response.data.error.message : '系统出现错误，请稍后再试'
      })
      break
    case 500:
      modal.error({
        title: error.response.data.error.message,
        content: error.response.data.error.details
      })
      break
    default:
      modal.error({
        title: '未处理的错误类型',
        content: 'status:' + error.response.status
      })
      break
  }
  return Promise.reject(error)
})

export default {
  Post (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response)
        }, error => {
          // resolve(error.response
          reject(error.response)
        })
        .catch((error) => {
          // resolve(error.response)
          reject(error.response)
        })
    })
  },
  Get (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params,
        paramsSerializer: params => {
          var json = qs.stringify(params, {
            indices: false
          })
          return json
        }
      })
        .then(response => {
          resolve(response)
        }, error => {
          resolve(response)
          reject(error.response)
        })
        .catch((error) => {
          resolve(response)
          reject(error.response)
        })
    })
  },
  Put (url, params) {
    return new Promise((resolve, reject) => {
      axios.put(url, params)
        .then(response => {
          resolve(response)
          resolve(response)
        }, error => {
          resolve(response)
          reject(error.response)
        })
        .catch((error) => {
          resolve(response)
          reject(error.response)
        })
    })
  },
  Delete (url, params) {
    return new Promise((resolve, reject) => {
      axios.delete(url, {
        params: params
      }).then(response => {
        resolve(response)
      }, error => {
        resolve(response)
        reject(error.response)
      }).catch((error) => {
        resolve(response)
        reject(error.response)
      })
    })
  }
}
