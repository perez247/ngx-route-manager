import { computed } from '@angular/core';
import { internalSignalRoute } from '../functions/listenForRouteChange';
import { ActivatedRoute } from '@angular/router';
import { of, filter, map } from 'rxjs';

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
  readonly snapshotValue = computed(() => {
    if (!internalSignalRoute()) {
      return '';
    } else {
      return internalSignalRoute()?.snapshot.queryParamMap.get(this.name) || '';
    }
  });

  /**
   * Listens for change on param in the query route
   */
  readonly listenForValue = computed(() => {
    if (!internalSignalRoute()) {
      return of('');
    } else {
      const route: ActivatedRoute =
        internalSignalRoute() || ({} as ActivatedRoute);
      return route.queryParamMap.pipe(
        filter((queryParamMap) => queryParamMap.has(this.name)),
        map((queryParamMap) => queryParamMap.get(this.name) || '')
      );
    }
  });

  constructor(name: string) {
    this._name = name;
  }
}
