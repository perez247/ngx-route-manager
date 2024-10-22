import { createUrlFunction } from "./createUrlFunction";
import { urlToNgxParam } from "./convertUrlTo";
import { NgxRoute } from "../models/ngx-route";
import { urlToSegments } from "./convertUrlToSegment";

export function generateNgxRoute<T extends string>(urlPattern?: T): NgxRoute<T> {
  const patern = urlPattern ? urlPattern : '';
  return new NgxRoute(patern, createUrlFunction(patern), urlToNgxParam(patern), urlToSegments(patern))
}

