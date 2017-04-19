/* eslint global-require: "off" */
const GetCash = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/get-cash'], () => {
    resolve(require('../views/get-cash'));
  });
};

export default [{
  path: '/get-cash',
  name: 'getCash',
  component: GetCash,
  meta: {
    title: '提现'
  }
}];
