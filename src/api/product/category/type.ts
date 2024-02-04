import { ResponseData } from "@/api/basic/type";

//分类ts类型
export interface CategoryObj {
  id: number;
  name: string;
  category1Id?: number;
  category2Id?: number;
  imageUrl: string;
  parentId: number;
  state: number;
  orderNum: number;
  updateTime: Date;
  createTime: Date;
}

//相应的分类接口返回数据的类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[];
}
