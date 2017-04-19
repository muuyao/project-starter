/* eslint global-require: "off" */
const Login = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/login'], () => {
    resolve(require('../views/login'));
  });
};

export default [{
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    title: '登录',
    className: 'bg-white'
  }
}];
