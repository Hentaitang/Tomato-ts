import axios from 'axios';
import history from './history';

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
    // Do something before request is sent
    const xToken = localStorage.getItem('x-token');
    if (xToken) {
      const headerKey = 'Authorization';
      config.headers[headerKey] = `Bearer ${xToken}`;
    }
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
    const tokenKey: string = 'x-token';
    const xToken: string = response.headers[tokenKey];
    if (xToken) {
      localStorage.setItem('x-token', xToken);
    }
    return response;
  },
  function(error) {
    // Do something with response error
    if (error.response.status === 401) {
      history.push('/login');
    }
    return Promise.reject(error);
  }
);

export default instance;
