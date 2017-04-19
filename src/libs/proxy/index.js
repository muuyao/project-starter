import urlUtils from '@/libs/utils/url';
import {
  proxy,
  _proxy
} from './prototype';
import './ios';
import './android';
import './web';

let op = urlUtils.getParams('op') || urlUtils.getHashParams('op');

if (op === '' || op == null) {
  if (navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-IOS') >= 0) {
    op = 'IOS';
  } else if (navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-ANDROID') >= 0) {
    op = 'ANDROID';
  }
}

const os = op ? op.toUpperCase() : 'WEB' ;

proxy.__current__ = proxy.DRIIVERS[os];
_proxy.os = os;

export default _proxy;
