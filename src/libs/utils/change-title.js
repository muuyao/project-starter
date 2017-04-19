import detect from './detect';

/**
 * 修改 document title
 * @param  {[type]} title [description]
 * @return {[type]}       [description]
 */
function changeTitle(title) {

  if (title) {
    document.title = title;
  }

  // Magic iPhone 微信需要通过加载 iframe 来刷新 title
  if (detect.os.ios ) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', '/favicon.ico');
    iframe.style.display = 'none';
    iframe.addEventListener('load', () => {
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 0);
    });
    document.body.appendChild(iframe);
  }
}

export default changeTitle;
