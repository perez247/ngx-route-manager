import { RouteParams } from "../functions/convertUrlTo";
import { ParamsToFunction } from "../functions/createUrlFunction";

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

  constructor(path: string, fn: ParamsToFunction<T>, params: RouteParams<T>) {
    this.path = path;
    this.fn = fn;
    this._params = params;
  }

  /**
   * All params store as an object
   */
  get params(): RouteParams<T>
  {
    return this._params
  }
}
