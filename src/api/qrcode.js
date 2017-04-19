import apis from '@/config/api';
import http from '@/libs/http';

const {
  getQRCodeUrl
} = apis.app;

export default {
  getQRCodeUrl(params, success) {
    http.doPost(getQRCodeUrl, params, success);
  }
};
