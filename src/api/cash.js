import apis from '@/config/api';
import http from '@/libs/http';

const cash = apis.cash;

// 获取奖励总额
export const getTotalcash = (success, error) => {
  http.doPost(cash.getTotalcash, {}, {
    success: data => success(data),
    error: data => error(data)
  });
}

// 获取奖励总额
export const getCash = (data, success, error) => {
  http.doPost(cash.getCash, data, {
    success: data => success(data),
    error: data => error(data)
  });
}

export const getCashLimit = (success, error) => {
  http.doPost(cash.getCashLimit, {}, {
    success: data => success(data),
    error: data => error(data)
  })
}