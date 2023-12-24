//统一管理咱们项目用户相关的接口
import request from "@/utils/request";

import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
  captchaResponseData,
} from "./type";

//项目用户相关的请求地址
enum API {
  LOGIN_URL = "/admin/system/index/login",
  USERINFO_URL = "/admin/system/index/getUserInfo",
  LOGOUT_URL = "/admin/system/index/logout",
  CAPTCHAR_URL = "/admin/system/index/generateValidateCode",
}

//登录接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);

//获取用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL);

//退出登录
export const reqLogout = () => request.get<any, any>(API.LOGOUT_URL);

// 获取验证码
export const getValidateCode = () =>
  request.get<any, captchaResponseData>(API.CAPTCHAR_URL);
