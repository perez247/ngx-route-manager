import { inject, Inject, Injectable, Type } from '@angular/core';
import { NgxRoute } from '../models/ngx-route';
import { ActivatedRoute } from '@angular/router';
import { NGX_ROUTE_MANAGER_CONFIG } from '../../app.module';
import { NgxParam } from '../models/ngx-param';

@Injectable()
export class NgxRouteManagerService<T> {

  constructor(
    @Inject(NGX_ROUTE_MANAGER_CONFIG) private ngxRoutes: T,
    route: ActivatedRoute
  ) {
    this.initiailizeRoute(route);
  }

  get routes(): T {
    return this.ngxRoutes
  }

  /**
   * Makes sure that the NgxParam has the latest activatedRoute so it can be called
   * again to get the latest activatedRoute
   */
  protected initiailizeRoute(route: ActivatedRoute) {
    try {
      for (const key in this.ngxRoutes) {

        let ngxRoute: NgxRoute<string> = this.ngxRoutes[key] as any;

        let ngxParams: any = ngxRoute.params as any;

        for (const key in ngxParams) {
          ngxParams[key] = new NgxParam(key, route);
        }
      }
    } catch (error) {
      throw new Error('Unable to reinitialize route, check the ngxRoute object and type created')
    }
  }
}
