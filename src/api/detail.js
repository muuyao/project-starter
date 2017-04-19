import apis from '@/config/api';
import http from '@/libs/http';

const detail = apis.detail;

// 获取邀请记录明细
export const getInviteDetail = (data, success, error) => {
  http.doPost(detail.getInviteDetail, data, {
    success: data => success(data),
    error: data => error(data)
  });
}

// 获取奖励总额
export const getCashDetail = (data, success, error) => {
  http.doPost(detail.getCashDetail, data, {
    success: data => success(data),
    error: data => error(data)
  });
}
