export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//品牌的ts数据类型
export interface TradeMark {
  id?: number;
  name: string;
  logo: string;
}

//品牌数组
export type Records = TradeMark[];

//请求的品牌数据
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
