import apis from '@/config/api';
import http from '@/libs/http';

const bankcard = apis.bankcard;

// 获取已绑定的银行卡
export const getBankcards = (success, error) => {
  http.doPost(bankcard.getBankCards, {}, {
    success: data => success(data),
    error: data => error(data)
  });
}

// 获取银行卡列表
export const getBankcardList = (success, error) => {
  http.doPost(bankcard.getBankList, {}, {
    success: data => {success(data)},
    error: data => error(data)
  });
}

// 添加银行卡
export const addBankcard = (data, success, error) => {
  http.doPost(bankcard.addBankCard, data, {
    success: data => success(data),
    error: data => error(data)
  });
}

// 添加身份证信息
export const addIdCard = (data, success, error) => {
  http.doPost(bankcard.saveNameIdcard, data, {
    success: data => success(data),
    error: data => error(data)
  });
}
