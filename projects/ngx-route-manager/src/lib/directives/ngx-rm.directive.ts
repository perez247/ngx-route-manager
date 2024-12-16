import { Directive, inject } from '@angular/core';
import { NgxRouteManagerService } from '../services/ngx-route-manager.service';

@Directive({
  selector: '[NgxRouteManager]',
  standalone: true,
  exportAs: 'NgxRouteManager',
})
export class NgxRmDirective<T> {
  ngxRouteManagerService = inject(NgxRouteManagerService<T>);

  constructor() {
    this.ngxRouteManagerService.initializeRoute();
  }

  get routes(): T {
    return this.ngxRouteManagerService.routes;
  }
}
