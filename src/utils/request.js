import axios from "axios";

const instence = axios.create({
  baseURL: "http://182.92.128.115/api",
  //   headers:{}
});

instence.interceptors.request.use((config) => {
  return config;
});

// 响应拦截器
instence.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data.data;
    }
    return Promise.reject(response.data.message);
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instence;
