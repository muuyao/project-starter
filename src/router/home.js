export default [{
  path: '/home',
  name: 'home',
  component: resolve => require(['../views/home'], resolve),
  meta: {
    title: '首页'
  }
}];
