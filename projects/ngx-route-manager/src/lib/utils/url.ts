
export interface NgxParseUrl {
  route: string[];
  extras: {
    queryParams: {
      [k: string]: string;
    };
  };
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
