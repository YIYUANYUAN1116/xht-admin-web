import request from "@/utils/request";
import { CategoryObj, CategoryResponseData } from "./type";

//属性管理模块接口地址
enum API {
  //获取分类接口地址
  CATEGORY_URL = "/admin/product/category",
  UPDATECATEGORY_URL = "/admin/product/category",
  ADDCATEGORY_URL = "/admin/product/category",
  REMOVECATEGORY_URL = "/admin/product/category",
}

export const getCategory = (parentId: number) =>
  request.get<any, CategoryResponseData>(API.CATEGORY_URL + `/${parentId}`);

export const reqAddOrUpdateCategory = (data: CategoryObj) => {
  if (data.id) {
    //更新
    return request.put<any, any>(API.UPDATECATEGORY_URL, data);
  } else {
    //新增
    return request.post<any, any>(API.ADDCATEGORY_URL, data);
  }
};

export const reqRemoveCategory = (id: number) =>
  request.delete<any, any>(API.REMOVECATEGORY_URL + `/${id}`);
