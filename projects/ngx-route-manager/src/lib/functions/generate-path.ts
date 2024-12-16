import { createUrlFunction } from "./createUrlFunction";
import { urlToNgxParam } from "./convertUrlTo";
import { NgxRoute } from "../models/ngx-route";
import { urlToSegments } from "./convertUrlToSegment";

export function generateNgxRoute<T extends string>(urlPattern?: T): NgxRoute<T> {
  const pattern = urlPattern ? urlPattern : '';
  const ngxRoute = new NgxRoute(pattern, createUrlFunction(pattern), urlToNgxParam(pattern), urlToSegments(pattern))
  return ngxRoute;
}
