import request from "@/utils/request";

import {LogResponseData} from "./type"

enum API{
    GETLIST_URL = "/admin/log",
}
export function listLogs(page: number, limit: number): Promise<LogResponseData> {
    return request.get(API.GETLIST_URL+`/${page}/${limit}/`);
  }