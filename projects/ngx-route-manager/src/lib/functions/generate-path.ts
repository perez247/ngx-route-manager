import { createUrlFunction } from "./createUrlFunction";
import { urlToNgxParam } from "./convertUrlTo";
import { NgxRoute } from "../models/ngx-route";

export function generateNgxRoute<T extends string>(urlPattern?: T): NgxRoute<T> {
  const pattern = urlPattern ? urlPattern : '';
  const ngxRoute = new NgxRoute(pattern, createUrlFunction(pattern), urlToNgxParam(pattern))
  return ngxRoute;
}
