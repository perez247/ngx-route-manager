import { RouteQueryParams } from '../functions/convertStringArrayTo';
import { RouteParams } from '../functions/convertUrlTo';
import {
  ExtractStaticSegments,
  SegmentObject,
} from '../functions/convertUrlToSegment';
import {
  ParamsToFunction,
  ParamsToUrlFunction,
} from '../functions/createUrlFunction';

export class NgxRoute<T extends string, Q extends string> {
  /**
   * The url path
   */
  readonly path: string = '';

  /**
   * Function to generate the url, requiring the right params
   */
  readonly fn: ParamsToFunction<T, Q> = {} as ParamsToFunction<T, Q>;

  /**
   * Function to generate the url, requiring the right params
   */
  readonly url: ParamsToUrlFunction<T, Q> = {} as ParamsToUrlFunction<T, Q>;

  /**
   * Stores all the params as
   */
  private _params: RouteParams<T> = {} as RouteParams<T>;

  /**
   * Stores all the params as
   */
  private _queryParams: RouteQueryParams<Q> = {} as RouteQueryParams<Q>;

  /**
   * Stores all the segments as
   */
  private _segments: SegmentObject<ExtractStaticSegments<T>> =
    {} as SegmentObject<ExtractStaticSegments<T>>;

  constructor(
    path: string,
    fn: ParamsToFunction<T, Q>,
    url: ParamsToUrlFunction<T, Q>,
    params: RouteParams<T>,
    segments: SegmentObject<ExtractStaticSegments<T>>,
    queryParams: RouteQueryParams<Q>
  ) {
    this.path = path;
    this.fn = fn;
    this.url = url;
    this._params = params;
    this._segments = segments;
    this._queryParams = queryParams;
  }

  /**
   * All params store as an object
   */
  get params(): RouteParams<T> {
    return this._params;
  }

  /**
   * All query params store as an object
   */
  get queryParams(): RouteQueryParams<Q> {
    return this._queryParams;
  }

  /**
   * All segments store as an object
   */
  get segments(): SegmentObject<ExtractStaticSegments<T>> {
    return this._segments;
  }
}
