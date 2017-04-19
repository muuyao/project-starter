/* eslint global-require: "off" */
const ProtocolSecret = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/protocol-secret'], () => {
    resolve(require('../views/protocol-secret'));
  });
};

export default [{
  path: '/protocol-secret',
  name: 'ProtocolSecret',
  component: ProtocolSecret,
  meta: {
    title: '注册服务协议'
  }
}];
