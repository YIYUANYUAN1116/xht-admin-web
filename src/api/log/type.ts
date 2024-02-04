import { ResponseData } from "@/api/basic/type";

export interface LogEntity {
  id: number;
  title: string;
  operUrl: string;
  operIp: string;
  operName: string;
  status: string;
  date: Date;
}

//log接口返回地址
export interface LogResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}

export type Records = LogEntity[];
