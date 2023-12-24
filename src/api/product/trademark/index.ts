import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark } from "./type";

//品牌管理模块接口地址
enum API {
  //获取已有品牌接口
  TRADEMARK_URL = "/admin/product/brand",
  //添加品牌
  ADDTRADEMARK_URL = "/admin/product/brand",
  //修改已有品牌
  UPDATETRADEMARK_URL = "/admin/product/brand",
  //删除已有品牌
  DELETE_URL = "/admin/product/brand",
}

//获取
export const reqHasTrademark = (
  page: number,
  limit: number,
): Promise<TradeMarkResponseData> => {
  request.get(API.TRADEMARK_URL + `/${page}/${limit}`);
};

export function list(
  page: number,
  limit: number,
): Promise<TradeMarkResponseData> {
  return request.get(`/admin/product/brand/${page}/${limit}`);
}

//新增或者更新
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    //更新
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
  } else {
    //新增
    return request.post<any, any>(API.ADDTRADEMARK_URL, data);
  }
};

//删除
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + `/` + id);
