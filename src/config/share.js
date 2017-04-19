import store from '@/store';
import urlUtils from '@/libs/utils/url';

export default {
  getUrl() {
    return urlUtils.fillParams({
      inviteCode: store.state.app.inviteCode
    }, `${location.protocol}//${location.host}/#/download`);
  },
  title: '【前方高能】恭喜您获得一笔巨款',
  description: '您的好友推荐您使用U族贷，最高5000额度！最快当天到账！',
  imgUrl: 'http://ww1.sinaimg.cn/large/006HJ39wgy1ferz7tpaqmj30b40b4my4.jpg'
};
