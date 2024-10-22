import { RouteParams } from "../functions/convertUrlTo";
import { ExtractStaticSegments, SegmentObject } from "../functions/convertUrlToSegment";
import { ParamsToFunction } from "../functions/createUrlFunction";
import { NgxSegment } from "./ngx-segment";

export class NgxRoute<T extends string> {
  /**
   * The url path
   */
  readonly path: string = '';

  /**
   * Function to generate the url, requiring the right params
   */
  readonly fn: ParamsToFunction<T> = {} as ParamsToFunction<T>;

  /**
   * Stores all the params as
   */
  private _params: RouteParams<T> = {} as RouteParams<T>

  
  /**
   * Stores all the segments as
   */
  private _segments: SegmentObject<ExtractStaticSegments<T>> = {} as SegmentObject<ExtractStaticSegments<T>>

  constructor(path: string, fn: ParamsToFunction<T>, params: RouteParams<T>, segments: SegmentObject<ExtractStaticSegments<T>>) {
    this.path = path;
    this.fn = fn;
    this._params = params;
    this._segments = segments;
  }

  /**
   * All params store as an object
   */
  get params(): RouteParams<T>
  {
    return this._params
  }

    /**
   * All segments store as an object
   */
    get segments(): SegmentObject<ExtractStaticSegments<T>>
    {
      return this._segments
    }
}
