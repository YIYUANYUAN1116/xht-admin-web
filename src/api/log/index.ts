import request from "@/utils/request";

import { LogResponseData } from "./type";
import { url } from "inspector";

enum API {
  GETLIST_URL = "/admin/log",
}
export function listLogs(
  page: number,
  limit: number,
  startDate: Date,
  endDate: Date,
): Promise<LogResponseData> {
  let url = API.GETLIST_URL + `/${page}/${limit}`;
  if (startDate && endDate) {
    url = url + `?startDate=${startDate}&endDate=${endDate}`;
  } else if (startDate) {
    url = url + `?startDate=${startDate}`;
  } else if (endDate) {
    url = url + `?endDate=${endDate}`;
  }
  return request.get(url);
}
