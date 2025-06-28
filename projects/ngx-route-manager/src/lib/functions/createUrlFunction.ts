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

export interface NgxParseUrl {
  route: string[];
  extras: {
    queryParams: {
      [k: string]: string;
    };
  };
}

export function createUrlFunction<T extends string, Q extends string>(
  template: T,
  queryParamsKeys?: Q
): ParamsToFunction<T, Q> {
  return ((
    args?: Record<string, string>,
    queryParams?: Record<string, string>
  ) => {
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
      path += `?${searchParams}`;
    }

    return path;
  }) as ParamsToFunction<T, Q>;
}

export type ParamsToUrlFunction<
  T extends string,
  Q extends string
> = HasParams<T> extends true
  ? (
      args: Record<ExtractParams<T>, string>,
      queryParams?: Partial<Record<Q, string>>
    ) => NgxParseUrl
  : (args?: undefined, queryParams?: Partial<Record<Q, string>>) => NgxParseUrl;

export function createUrlFunctionV2<T extends string, Q extends string>(
  template: T,
  queryParamsKeys?: Q
): ParamsToUrlFunction<T, Q> {
  return ((
    args?: Record<string, string>,
    queryParams?: Record<string, string>
  ) => {
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
      path += `?${searchParams}`;
    }

    return parseUrl(path);
  }) as ParamsToUrlFunction<T, Q>;
}

export function parseUrl(url: string): NgxParseUrl {
  const [path, queryString] = url.split('?');
  const params = new URLSearchParams(queryString || '');
  const queryParams: Record<string, string> = {};
  params.forEach((value, key) => {
    queryParams[key] = value;
  });

  return {
    route: [path],
    extras: { queryParams },
  };
}
