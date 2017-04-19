/* eslint global-require: "off" */
const ProtocolRegister = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/protocol-register'], () => {
    resolve(require('../views/protocol-register'));
  });
};

export default [{
  path: '/protocol-register',
  name: 'ProtocolRegister',
  component: ProtocolRegister,
  meta: {
    title: '注册服务协议'
  }
}];
