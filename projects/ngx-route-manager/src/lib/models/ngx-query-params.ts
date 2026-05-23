export class NgxQueryParam {
  /**
   * Name of the param
   */
  private readonly _name: string = '';
  public get name(): string {
    return this._name;
  }

  /**
   * @internal
   */
  public _parent?: any;

  constructor(name: string) {
    this._name = name;
  }
}
