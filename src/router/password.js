/* eslint global-require: "off" */
const Password = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/password'], () => {
    resolve(require('../views/password'));
  });
};

export default [{
  path: '/password',
  name: 'password',
  component: Password,
  meta: {
    title: '重置密码',
  }
}];
