
import http from '../../utils/fetch'

export default {
  namespaced: true,
  state: {
    loginInfo: {
      user: {}
    }
  },
  actions: {
    // 获取用户信息
    getCurrentLoginInformations (context) {
      http.Get('/api/services/app/Session/GetCurrentLoginInformations').then(function (data) {
        if (data.success) {
          context.commit('setuser', data.result)
        }
      })
    }
  },
  mutations: {
    setuser (state, loginInfo) {
      state.loginInfo = loginInfo
    }
  }
}
