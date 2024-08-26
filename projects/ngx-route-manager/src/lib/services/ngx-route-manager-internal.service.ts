import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NGX_ROUTE_MANAGER_CONFIG } from '../../app.module';
import { NgxRouteManagerService } from './ngx-route-manager.service';

@Injectable()
export class NgxRouteManagerInternalService<T> {

  constructor(
    @Inject(NGX_ROUTE_MANAGER_CONFIG) private ngxRoutesInternal: T,
  ) {}

  reInitialize(route: ActivatedRoute) {
    const service = new NgxRouteManagerService<T>(this.ngxRoutesInternal, route);
    this.ngxRoutesInternal = service.routes;
  }

  get routes(): T {
    return this.ngxRoutesInternal
  }

}
