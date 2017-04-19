import apis from '@/config/api';
import http from '@/libs/http';

const user = apis.user;

// 获取邀请记录明细
export const doLogin = (data, success, error) => {
  http.doPost(user.login, data, {
    success: data => success(data),
    error: data => error(data)
  });
};

// 注册
export const doRegister = (data, success, error) => {
  http.doPost(user.register, data, {
    success: data => success(data),
    error: data => error(data)
  });
};

// 重置密码
export const resetPassword = (data, success, error) => {
  http.doPost(user.resetPassword, data, {
    success: data => success(data),
    error: data => error(data)
  });
};

// 发送短信验证码
export const getValidCode = (data, success, error) => {
  http.doPost(user.getValidCode, data, {
    success: data => success(data),
    error: data => error(data)
  });
};

export const generateVerifyCodeImage = (params, success) => {
  http.doPost(user.generateVerifyCodeImage, params, {
    success: data => success(data)
  });
};

export const validateCodeImage = (params, success, error) => {
  http.doPost(user.validateCodeImage, params, {
    success: data => success(data),
    error: data => error(data)
  });
};
