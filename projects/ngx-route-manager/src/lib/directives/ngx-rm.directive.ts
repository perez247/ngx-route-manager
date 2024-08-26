import { Directive, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxRouteManagerInternalService } from '../services/ngx-route-manager-internal.service';

@Directive({
  selector: '[NgxRouteManager]',
  standalone: true,
  exportAs: 'NgxRouteManager',
})
export class NgxRmDirective<T> {
  @Input('NgxRouteManager') routeType!: T;

  constructor(
    private ngxRouteManagerService: NgxRouteManagerInternalService<T>,
    route: ActivatedRoute,
  ) {
    this.ngxRouteManagerService.reInitialize(route);
  }

  get routes(): T {
    return this.ngxRouteManagerService.routes;
  }
}
