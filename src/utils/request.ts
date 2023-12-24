import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";

//创建axios实例
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
});

//请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  console.log(config.headers.token);
  //config配置对象，headers属性请求头
  return config;
});

//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //处理网络错误
    let msg = "";
    console.log(error);
    let status = error.response.code;
    switch (status) {
      case 401:
        msg = "token过期";
        break;
      case 202:
        msg = "验证码错误";
        break;
      case 403:
        msg = "无权访问";
        break;
      case 404:
        msg = "请求地址错误";
        break;
      case 500:
        msg = "服务器出现问题";
        break;
      default:
        msg = "请求失败";
    }

    ElMessage({
      type: "error",
      message: msg,
    });

    return Promise.reject(error);
  },
);

export default request;