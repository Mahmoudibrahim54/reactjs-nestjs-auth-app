import axios from 'axios';

const HttpClient = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

export default HttpClient();
