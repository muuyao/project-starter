/* eslint global-require: "off" */
const Home = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/home/home'], () => {
    resolve(require('../views/home/home'));
  });
};

export default [{
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    title: '好友邀请'
  }
}];
