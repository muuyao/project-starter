/* eslint global-require: "off" */
const Download = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/download'], () => {
    resolve(require('../views/download'));
  });
};

export default [{
  path: '/download',
  name: 'download',
  component: Download,
  meta: {
    title: 'U族极速下载'
  }
}];
