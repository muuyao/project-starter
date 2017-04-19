/* eslint global-require: "off" */
const Register = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/register'], () => {
    resolve(require('../views/register'));
  });
};

export default [{
  path: '/register',
  name: 'register',
  component: Register,
  meta: {
    title: '注册',
    className: 'bg-white'
  }
}];
