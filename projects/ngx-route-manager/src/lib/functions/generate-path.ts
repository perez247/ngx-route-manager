import { createUrlFunction } from "./createUrlFunction";
import { urlToNgxParam } from "./convertUrlTo";
import { NgxRoute } from "../models/ngx-route";

export function generateNgxRoute<T extends string>(urlPattern: T): NgxRoute<T> {
  return new NgxRoute(urlPattern, createUrlFunction(urlPattern), urlToNgxParam(urlPattern))
}

