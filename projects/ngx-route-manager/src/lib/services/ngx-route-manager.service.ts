import { effect, inject, Inject, Injectable, signal, Type } from '@angular/core';
import { NgxRoute } from '../models/ngx-route';
import { ActivatedRoute } from '@angular/router';
import { NGX_ROUTE_MANAGER_CONFIG } from '../../app.module';
import { NgxParam } from '../models/ngx-param';

@Injectable()
export class NgxRouteManagerService<T> {

  route = signal(inject(ActivatedRoute));

  constructor(
    @Inject(NGX_ROUTE_MANAGER_CONFIG) private ngxRoutes: T
  ) {
    effect(() => {
      try {
        for (const key in this.ngxRoutes) {
  
          let ngxRoute: NgxRoute<string> = this.ngxRoutes[key] as any;
  
          let ngxParams: any = ngxRoute.params as any;
  
          for (const key in ngxParams) {
            ngxParams[key] = new NgxParam(key, this.route());
          }
        }
      } catch (error) {
        throw new Error('Unable to reinitialize route, check the ngxRoute object and type created')
      }
    });
  }

  get routes(): T {
    return this.ngxRoutes
  }

  /**
   * Makes sure that the NgxParam has the latest activatedRoute so it can be called
   * again to get the latest activatedRoute
   */
  public initializeRoute() {
    this.route.set(inject(ActivatedRoute));
  }
}
