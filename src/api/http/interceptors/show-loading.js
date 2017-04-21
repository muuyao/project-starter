import {
  Indicator
} from 'mint-ui';

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
  loadingCount--;
  if (loadingCount <= 0) {
    Indicator.close();
  }
}

export default (instance) => {
  // Add a request interceptor
  instance.interceptors.request.use((config) => {
    if (config.showLoading !== false) {
      showLoading();
    }
    return config;
  }, (error) => {
    // Do something with request error
    if (error.config.showLoading !== false) {
      closeLoading();
    }
    return Promise.reject(error);
  });

  // Add a response interceptor
  instance.interceptors.response.use((response) => {
    if (response.config.showLoading !== false) {
      closeLoading();
    }
    return response;
  }, (error) => {
    // Do something with response error
    if (error && error.config && error.config.showLoading !== false) {
      closeLoading();
    }

    return Promise.reject(error);
  });
};
