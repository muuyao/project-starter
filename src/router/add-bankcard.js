/* eslint global-require: "off" */
const AddBankcard = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/add-bankcard'], () => {
    resolve(require('../views/add-bankcard'));
  });
};

export default [{
  path: '/add-bankcard',
  name: 'AddBankCard',
  component: AddBankcard,
  meta: {
    title: '添加银行卡'
  }
}];
