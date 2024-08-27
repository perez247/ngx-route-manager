import { createUrlFunction } from "./createUrlFunction";
import { urlToNgxParam } from "./convertUrlTo";
import { NgxRoute } from "../models/ngx-route";

export function generateNgxRoute<T extends string>(urlPattern?: T): NgxRoute<T> {
  const patern = urlPattern ? urlPattern : '';
  return new NgxRoute(patern, createUrlFunction(patern), urlToNgxParam(patern))
}

