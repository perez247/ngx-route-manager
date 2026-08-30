import { ActivatedRoute } from '@angular/router';
import { of, filter, map, Observable } from 'rxjs';
import { internalSignalRoute } from '../functions/listenForRouteChange';

export class NgxQueryParam {
  /**
   * Name of the param
   */
  private readonly _name: string = '';
  public get name(): string {
    return this._name;
  }

  /**
   * Returns the current snapshot of the value in the query url route
   */
  public snapshotValue(route?: ActivatedRoute): string {
    if (route) {
      internalSignalRoute.set(route);
    }
    const currentRoute = internalSignalRoute();
    if (!currentRoute) {
      return '';
    }
    return currentRoute.snapshot.queryParamMap.get(this.name) || '';
  }

  /**
   * Listens for change on param in the query route
   */
  public listenForValue(route?: ActivatedRoute): Observable<string> {
    if (route) {
      internalSignalRoute.set(route);
    }
    const currentRoute = internalSignalRoute();
    if (!currentRoute) {
      return of('');
    }
    return currentRoute.queryParamMap.pipe(
      filter((queryParamMap) => queryParamMap.has(this.name)),
      map((queryParamMap) => queryParamMap.get(this.name) || '')
    );
  }

  constructor(name: string) {
    this._name = name;
  }
}
