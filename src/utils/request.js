import axios from "axios";

// 提示框
import { Message } from "element-ui";

import store from "../store";
// uuid
import getUserTempId from "@utils/getUserTempId";

// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 防到内存中,性能优化
const userTempId = getUserTempId();

const instence = axios.create({
  //   baseURL: "http://182.92.128.115/api",
  baseURL: "/api",
  //   headers:{}
});

instence.interceptors.request.use((config) => {
  NProgress.start();
  config.headers.userTempId = userTempId;

  const token = store.state.user.token;
  if (token) {
    config.headers.token = token;
  }
  return config;
});

// 响应拦截器
instence.interceptors.response.use(
  (response) => {
    NProgress.done();
    if (response.data.code === 200) {
      return response.data.data;
    }
    Message.error(response.data.message);
    return Promise.reject(response.data.message);
  },
  (err) => {
    NProgress.done();
    Message.error(err);
    return Promise.reject(err);
  }
);

export default instence;
