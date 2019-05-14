export default {
  namespaced: true,
  state: {
    isMobile: false,
    theme: 'dark',
    layout: 'side',
    systemName: '分销管理系统',
    copyright: 'XXXX科技',
    footerLinks: [
      { link: 'http://www.rhpass.com', name: '首页' }
    ],
    multipage: true
  },
  mutations: {
    setDevice (state, isMobile) {
      state.isMobile = isMobile
    },
    setTheme (state, theme) {
      state.theme = theme
    },
    setLayout (state, layout) {
      state.layout = layout
    },
    setMultipage (state, multipage) {
      state.multipage = multipage
    }
  }
}
