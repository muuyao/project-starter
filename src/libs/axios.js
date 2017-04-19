import {
  Indicator,
  MessageBox
} from 'mint-ui';
import axios from 'axios';

let loadingCount = 0;

function showLoading() {
  loadingCount++;
  if (loadingCount <= 1) {
    Indicator.open({
      spinnerType: 'fading-circle'
    });
  }
}

function closeLoading() {
  if (loadingCount > 0) {
    loadingCount--;
  }

  if (loadingCount === 0) {
    Indicator.close();
  }
}

function createAxios() {
  const instance = axios.create({
    timeout: 1000 * 10
  });

  // Add a request interceptor
  instance.interceptors.request.use((config) => {
    if (config.loading !== false) {
      showLoading();
    }
    return config;
  }, (error) => {
    // Do something with request error
    if (error.config.loading !== false) {
      closeLoading();
    }
    return Promise.reject(error);
  });

  // Add a response interceptor
  instance.interceptors.response.use((response) => {
    if (response.config.loading !== false) {
      closeLoading();
    }
    return response;
  }, (error) => {
    // Do something with response error
    if (error && error.config && error.config.loading !== false) {
      closeLoading();
    }

    return Promise.reject(error);
  });

  return instance;
}

export default createAxios();
