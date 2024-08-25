import { Directive, Input } from '@angular/core';
import { NgxRouteManagerService } from '../services/ngx-route-manager.service';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[NgxRouteManager]',
  standalone: true,
  exportAs: 'NgxRouteManager',
})
export class NgxRmDirective<T> {
  @Input('NgxRouteManager') routeType!: T;

  constructor(
    private ngxRouteManagerService: NgxRouteManagerService<T>,
    route: ActivatedRoute,
  ) {
    this.ngxRouteManagerService.initiailizeRoute(route);
  }

  get routes(): T {
    return this.ngxRouteManagerService.routes;
  }
}
