import { effect, inject, Inject, Injectable, signal } from '@angular/core';
import { NgxRoute } from '../models/ngx-route';
import { ActivatedRoute } from '@angular/router';
import { NGX_ROUTE_MANAGER_CONFIG } from '../../app.module';

export const internalActivatedRoute = {
  called: 0,
  route: signal<ActivatedRoute | undefined>(undefined),
  routeAdded: false,
}

@Injectable()
export class NgxRouteManagerService<T> {

  ngxRoutes = inject(NGX_ROUTE_MANAGER_CONFIG);

  constructor(
    // @Inject(NGX_ROUTE_MANAGER_CONFIG) private ngxRoutes: T
  ) {
    internalActivatedRoute.route.set(inject(ActivatedRoute));
  }

  get routes(): T {
    return this.ngxRoutes
  }

  /**
   * Makes sure that the NgxParam has the latest activatedRoute so it can be called
   * again to get the latest activatedRoute
   */
  public initializeRoute() {
    internalActivatedRoute.route.set(inject(ActivatedRoute));
  }
}
