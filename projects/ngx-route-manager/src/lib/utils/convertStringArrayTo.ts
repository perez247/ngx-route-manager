import { NgxQueryParam } from '../models/ngx-query-params';

export type RouteQueryParams<T extends string> = {
  [K in T]: NgxQueryParam;
};

export function urlToNgxQueryParam<T extends string>(
  route: T[]
): RouteQueryParams<T> {
  return route.reduce((a, b) => {
    if (!/^[A-Za-z_]+$/.test(b)) {
      throw new Error(`${b} must contain only alphabets and underscore`);
    }

    a[b] = new NgxQueryParam(b);
    return a;
  }, {} as RouteQueryParams<T>);
}
