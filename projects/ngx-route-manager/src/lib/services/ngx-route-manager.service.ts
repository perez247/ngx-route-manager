import { inject, Inject, Injectable } from '@angular/core';
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

  get routes() {
    return this.ngxRoutes
  }

  /**
   * Makes sure that the NgxParam has the latest activatedRoute so it can be called
   * again to get the latest activatedRoute
   */
  initiailizeRoute(route: ActivatedRoute) {
    for (const key in this.ngxRoutes) {

      let ngxRoute: NgxRoute<string> = this.ngxRoutes[key] as any;

      let ngxParams: any = ngxRoute.params as any;

      for (const key in ngxParams) {
        ngxParams[key] = new NgxParam(key, route);
      }
    }
  }
}
