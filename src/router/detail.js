/* eslint global-require: "off" */
const Detail = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/detail'], () => {
    resolve(require('../views/detail'));
  });
};

export default [{
  path: '/detail',
  name: 'detail',
  component: Detail,
  meta: {
    title: '明细'
  }
}];
