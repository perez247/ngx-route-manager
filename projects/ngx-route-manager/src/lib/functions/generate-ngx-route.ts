import { createUrlFunction, createUrlFunctionV2 } from './createUrlFunction';
import { urlToNgxParam } from '../utils/convertUrlTo';
import { NgxRoute } from '../models/ngx-route';
import { urlToSegments } from '../utils/convertUrlToSegment';
import { urlToNgxQueryParam } from '../utils/convertStringArrayTo';

export function generateNgxRoute<T extends string, Q extends string>(
  urlPattern?: T,
  queryParamsKeys: Q[] = []
): NgxRoute<T, Q> {
  const pattern = urlPattern ? urlPattern : '';
  const ngxRoute = new NgxRoute(
    pattern,
    createUrlFunction(pattern),
    createUrlFunctionV2(pattern),
    urlToNgxParam(pattern),
    urlToSegments(pattern),
    urlToNgxQueryParam(queryParamsKeys)
  );
  return ngxRoute;
}
