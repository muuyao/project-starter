/* eslint global-require: "off" */
const SelectBankcard = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/select-bankcard'], () => {
    resolve(require('../views/select-bankcard'));
  });
};

export default [{
  path: '/select-bankcard',
  name: 'SelectBankCard',
  component: SelectBankcard,
  meta: {
    title: '选择银行卡'
  }
}];
