import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { internalSignalRoute } from '../functions/listenForRouteChange';

@Injectable({
  providedIn: 'root',
})
export class NgxRouteManagerService {
  /**
   * Updates internalSignalRoute with the provided ActivatedRoute
   */
  public updateRoute(route: ActivatedRoute): void {
    if (route) {
      internalSignalRoute.set(route);
    }
  }

  /**
   * Alias for updateRoute
   */
  public setRoute(route: ActivatedRoute): void {
    this.updateRoute(route);
  }

  /**
   * Alias for updateRoute
   */
  public updateActivatedRoute(route: ActivatedRoute): void {
    this.updateRoute(route);
  }

  /**
   * Returns the current ActivatedRoute set in internalSignalRoute
   */
  public get currentRoute(): ActivatedRoute | undefined {
    return internalSignalRoute();
  }
}
