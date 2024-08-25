import { NgxParam } from "../models/ngx-param";


export type RouteParams<T extends string> = {
  [K in ExtractRouteParams<T>]: NgxParam;
};

type ExtractRouteParams<T extends string> =
  T extends `${infer _}:${infer Param}/${infer Rest}`
    ? Param | ExtractRouteParams<Rest>
    : T extends `${infer _}:${infer Param}`
    ? Param
    : never;

export function urlToNgxParam<T extends string>(route: T): RouteParams<T> {
  const segments = route.split('/');
  const params: any = {};

  segments.forEach(segment => {
    if (segment.startsWith(':')) {
      const param = segment.slice(1);

      if (!/^[A-Za-z]+$/.test(param)) { throw new Error(`${param} must contain only alphabets in ${route}`) }

      params[param] = new NgxParam(param);
    }
  });

  return params;
}
