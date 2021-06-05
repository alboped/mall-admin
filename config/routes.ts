export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    layout: false,
    component: './login',
  },
  {
    path: '/home',
    name: '首页',
    icon: 'HomeOutlined',
    component: './home',
  },
  {
    path: '/user',
    name: '用户中心',
    icon: 'TeamOutlined',
    component: './user',
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'ProfileOutlined',
    component: './order',
  },
  {
    name: '运营管理',
    icon: 'CommentOutlined',
    path: '/operation',
    routes: [
      {
        path: '/operation/homeConfig',
        name: '网站首页配置',
        component: './operation/homeConfig',
      },
      {
        path: '/operation/goods',
        name: '商品管理',
        component: './operation/Goods',
      },
      {
        path: '/operation/goodsClassify',
        name: '商品分类',
        component: './operation/GoodsClassify',
      },
      {
        path: '/operation/postage',
        name: '运费管理',
        component: './operation/Postage',
      },
    ],
  },
  {
    name: '统计管理',
    icon: 'BarChartOutlined',
    path: '/statistics',
    routes: [
      {
        path: '/statistics/income',
        name: '收入统计',
        component: './statistics/Income',
      },
      {
        path: '/statistics/goods',
        name: '商品统计',
        component: './statistics/Goods',
      },
    ],
  },
  {
    name: '系统管理',
    icon: 'SettingOutlined',
    path: '/system',
    routes: [
      {
        path: '/system/user',
        name: '用户管理',
        component: './system/User',
      },
      {
        path: '/system/role',
        name: '角色管理',
        component: './system/Role',
      },
      {
        path: '/system/system',
        name: '系统管理',
        component: './system/System',
      },
    ],
  },
  {
    component: './404',
  },
];
