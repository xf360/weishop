import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [{
    path: '*',
    redirect: '/index/message'
  },
  // {
  //   name: 'login',
  //   path:'login',
  //   component: () => import('./view/login.vue'),
  //   meta: {
  //     title: '登陆页'
  //   }
  // },
  {
    name: 'login',
    component: () => import('./view/login.vue'),
    meta: {
      title: '登陆页'
    }
  },
  {
    name: 'mycash',
    component: () => import('./view/user/mycash.vue'),
    meta: {
      title: '我的钱包'
    }
  },
  {
    name: 'getcash',
    component: () => import('./view/user/getcash.vue'),
    meta: {
      title: '余额提现'
    }
  },
  {
    name: 'getcashlist',
    component: () => import('./view/user/getcashlist.vue'),
    meta: {
      title: '提现记录'
    }
  },
  {
    name: 'pushcash',
    component: () => import('./view/user/pushcash.vue'),
    meta: {
      title: '货款充值'
    }
  },
  {
    name: 'pushcashlist',
    component: () => import('./view/user/pushcashlist.vue'),
    meta: {
      title: '货款充值'
    }
  },
  {
    name: 'myway',
    component: () => import('./view/user/myway.vue'),
    meta: {
      title: '渠道'
    }
  },
  {
    name: 'agentinfo',
    component: () => import('./view/user/agentinfo.vue'),
    meta: {
      title: '代理详情'
    }
  },
  {
    name: 'mylicence',
    component: () => import('./view/user/mylicence.vue'),
    meta: {
      title: '我的授权'
    }
  },
  {
    name: 'myad',
    component: () => import('./view/user/myad.vue'),
    meta: {
      title: '我要推广'
    }
  },
  {
    name: 'myadadd',
    component: () => import('./view/user/myadadd.vue'),
    meta: {
      title: '新增邀请链接'
    }
  },
  {
    name: 'myaddinfo',
    component: () => import('./view/user/myaddinfo.vue'),
    meta: {
      title: '邀请链接'
    }
  },
  {
    name: 'setting',
    component: () => import('./view/user/setting/index.vue'),
    meta: {
      title: '设置'
    }
  },
  {
    name: 'index',
    component: () => import('./view/'),
    meta: {
      title: '首页'
    },
    children: [{
        name: 'message',
        path: 'message',
        component: () => import('./view/message'),
        meta: {
          title: '消息'
        }
      }, {
        name: 'cart',
        path: 'cart',
        component: () => import('./view/cart'),
        meta: {
          title: '购物车'
        }
      },
      {
        name: 'user',
        path:'user',
        component: () => import('./view/user'),
        meta: {
          title: '会员中心'
        }
      },
      {
        name: 'mall',
        path:'mall',
        component: () => import('./view/mall'),
        meta: {
          title: '商城'
        }
      },
      {
        name: 'trylist',
        path:'trylist',
        component: () => import('./view/mall/trylist.vue'),
        meta: {
          title: '试用装'
        }
      },
      {
        name: 'zhigou',
        path:'zhigou',
        component: () => import('./view/mall/zhigou.vue'),
        meta: {
          title: '直购'
        }
      },
      {
        name: 'jiesuan',
        path:'jiesuan',
        component: () => import('./view/cart/jiesuan.vue'),
        meta: {
          title: '结算'
        }
      },
      {
        name: 'addresslist',
        path:'addresslist',
        component: () => import('./view/cart/addresslist.vue'),
        meta: {
          title: '地址列表'
        }
      },
      {
        name: 'addressedit',
        path:'addressedit',
        component: () => import('./view/cart/addressedit.vue'),
        meta: {
          title: '地址编辑'
        }
      },
      {
        name: 'mygoodlist',
        path:'mygoodlist',
        component: () => import('./view/user/mygoodlist.vue'),
        meta: {
          title: '我的商品列表'
        }
      },
    ]
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};