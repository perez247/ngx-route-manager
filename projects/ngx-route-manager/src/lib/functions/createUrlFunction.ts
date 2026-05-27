import { NgxParseUrl, parseUrl } from "../utils/url";

type ExtractParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? Param | ExtractParams<Rest>
  : T extends `${infer _Start}:${infer Param}`
  ? Param
  : never;

type HasParams<T extends string> = ExtractParams<T> extends never
  ? false
  : true;

export type ParamsToFunction<
  T extends string,
  Q extends string
> = HasParams<T> extends true
  ? (
    args: Record<ExtractParams<T>, string>,
    queryParams?: Partial<Record<Q, string>>
  ) => string
  : (args?: undefined, queryParams?: Partial<Record<Q, string>>) => string;

export type ParamsToUrlFunction<
  T extends string,
  Q extends string
> = HasParams<T> extends true
  ? (
    args: Record<ExtractParams<T>, string>,
    queryParams?: Partial<Record<Q, string>>
  ) => NgxParseUrl
  : (args?: undefined, queryParams?: Partial<Record<Q, string>>) => NgxParseUrl;


function buildUrl<T extends string>(
  template: T,
  args?: Record<string, string>,
  queryParams?: Record<string, string>): string {
  if (!args && template.includes(':')) {
    throw new Error('Arguments are required for this template');
  }
  if (args && !template.includes(':')) {
    throw new Error('This template does not accept any arguments');
  }

  let path = template.replace(/:([a-zA-Z]+)/g, (_, key) => {
    const value = args?.[key];
    if (value === undefined)
      throw new Error(`Missing value for parameter: ${key}`);
    return value;
  });

  if (queryParams && Object.keys(queryParams).length > 0) {
    const searchParams = new URLSearchParams(queryParams).toString();
    path += (path.includes('?') ? '&' : '?') + searchParams;
  }

  return path;
}

export function createUrlFunction<T extends string, Q extends string>(
  template: T
): ParamsToFunction<T, Q> {
  return ((
    args?: Record<string, string>,
    queryParams?: Record<string, string>
  ) => {
    return buildUrl(template, args, queryParams);
  }) as ParamsToFunction<T, Q>;
}

export function createUrlFunctionV2<T extends string, Q extends string>(
  template: T
): ParamsToUrlFunction<T, Q> {
  return ((
    args?: Record<string, string>,
    queryParams?: Record<string, string>
  ) => {
    const fullUrl = buildUrl(template, args, queryParams);
    return parseUrl(fullUrl);
  }) as ParamsToUrlFunction<T, Q>;
}
