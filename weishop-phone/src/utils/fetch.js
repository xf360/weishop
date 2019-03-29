import Vue from 'vue';
import { Notify } from 'vant';
Vue.use(Notify);
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
    debugger
    switch (error.response.status) {
      case 400:
        var content = ''
        if (error.response.data.error.validationErrors) {
          content = error.response.data.error.validationErrors[0].message + ':' + error.response.data.error.validationErrors[0].members.join(',')
        } else {
          content = error.response.data.error.details
        }
        Notify(error.response.data.error.message);
        break
      case 401:
        window.localStorage.removeItem('token')
        window.location.href = window.location.pathname + '#/login'
        Notify('登陆信息已失效，请重新登陆。');
        return Promise.reject(error)
      case 403:
        break
      case 404:
        Notify('数据未找到-404');
        break
      case 500:
        Notify(error.response.data.error.message);
        break
      default:
        Notify('未处理的错误类型');
        break
    }
    return Promise.reject(error)
  })
  
  export default {
    Post (url, params, result) {
      if (!result) {
        result = {}
      }
      result.loading = true
      return new Promise((resolve, reject) => {
        axios.post(url, params)
          .then(response => {
            result.loading = false
            result.data = response
            resolve(response)
          }, error => {
            result.loading = false
            result.data = error.response.data
            // resolve(error.response)
            reject(error.response)
          })
          .catch((error) => {
            result.loading = false
            result.data = error.response.data
            // resolve(error.response)
            reject(error.response)
          })
      })
    },
    Get (url, params, vm) {
      if (vm) {
        vm.loading = true
      }
      var data = null
      if (params) {
        data = params.params
      }
      return new Promise((resolve, reject) => {
        axios.get(url, {
          params: data,
          paramsSerializer: params => {
            var json = qs.stringify(params, {
              indices: false
            })
            return json
          }
        })
          .then(response => {
            if (vm) {
              vm.loading = false
            }
            resolve(response)
          }, error => {
            if (vm) {
              vm.loading = false
            }
            reject(error.response)
          })
          .catch((error) => {
            if (vm) {
              vm.loading = false
            }
            reject(error.response)
          })
      })
    },
    Put (url, params, vm) {
      if (vm) {
        vm.loading = true
      }
      return new Promise((resolve, reject) => {
        axios.put(url, params)
          .then(response => {
            if (vm) {
              vm.loading = false
            }
            resolve(response)
          }, error => {
            if (vm) {
              vm.loading = false
            }
            reject(error.response)
          })
          .catch((error) => {
            if (vm) {
              vm.loading = false
            }
            reject(error.response)
          })
      })
    },
    Delete (url, params, vm) {
      return new Promise((resolve, reject) => {
        axios.delete(url, {
          params: params
        }).then(response => {
          if (vm) {
            vm.loading = false
          }
          resolve(response)
        }, error => {
          if (vm) {
            vm.loading = false
          }
          reject(error.response)
        }).catch((error) => {
          if (vm) {
            vm.loading = false
          }
          reject(error.response)
        })
      })
    }
  }
  