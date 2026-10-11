import { filter, map, of, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { internalSignalRoute } from "../functions/listenForRouteChange";

export class NgxParam {

  /**
   * Name of the param
   */
  private readonly _name: string = '';
  public get name(): string {
    return this._name;
  }

  /**
   * Returns the current snapshot of the value in the url route
   */
  public snapshotValue(route?: ActivatedRoute): string {
    if (route) {
      internalSignalRoute.set(route);
    }
    const currentRoute = internalSignalRoute();
    if (!currentRoute) {
      return '';
    }
    return currentRoute.snapshot.paramMap.get(this.name) || '';
  }

  /**
   * Listens for change on param in the route
   */
  public listenForValue(route?: ActivatedRoute): Observable<string> {
    if (route) {
      internalSignalRoute.set(route);
    }
    const currentRoute = internalSignalRoute();
    if (!currentRoute) {
      return of('');
    }
    return currentRoute.paramMap.pipe(
      filter(paramMap => paramMap.has(this.name)),
      map(paramMap => paramMap.get(this.name) || '')
    );
  }

  constructor(name: string) {
    this._name = name;
  }
}
