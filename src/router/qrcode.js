/* eslint global-require: "off" */
const QRCode = (resolve) => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../views/qrcode'], () => {
    resolve(require('../views/qrcode'));
  });
};
export default [{
  path: '/qrcode',
  name: 'qrcode',
  component: QRCode,
  meta: {
    title: '邀请二维码'
  }
}];
