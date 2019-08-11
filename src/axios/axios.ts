import axios from 'axios';

const appId: string = 'sDRa5781dPR27ams6REyKzhN';
const appSecret: string = 'vBaxfiVuXcPuZY8fk1SjmcaZ';

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  timeout: 5000,
  headers: {
    't-app-id': appId,
    't-app-secret': appSecret
  }
});

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    const xToken = localStorage.getItem('x-token');
    if (xToken) {
      const headerKey = 'Authorization';
      config.headers[headerKey] = `Bearer ${xToken}`;
    }
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    const tokenKey = 'X-token';
    const xToken = response.headers[tokenKey];
    if (xToken) {
      localStorage.setItem('x-token', xToken);
    }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
