import axios from 'axios';

const HttpClient = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers.Authorization =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    return config;
  });

  // instance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     // if (error?.response?.status === 401 || error?.response?.status === 403) {
  //     //   // window.location.assign(`${import.meta.env.VITE_BASE_URL}/aut/login`);
  //     // }
  //     return error;
  //   },
  // );

  return instance;
};

export default HttpClient();
