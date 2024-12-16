import { Directive, Input, inject } from '@angular/core';
import { NgxRmDirective } from 'ngx-route-manager';
import { NgxRouteType } from '../ngx-routes';

@Directive({
  selector: '[CustomNgxRouteManager]',
  standalone: true,
  exportAs: 'CustomNgxRouteManager',
})
export class CustomNgxRmDirective extends NgxRmDirective<NgxRouteType> {}
