import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { NgxRmDirective } from './lib/directives/ngx-rm.directive';


export const NGX_ROUTE_MANAGER_CONFIG = new InjectionToken<any>('NGX_ROUTE_MANAGER_CONFIG');

@NgModule({
  imports: [NgxRmDirective],
  exports: [NgxRmDirective]
})
export class NgxRouteManagerModule {
  static forRoot<T>(config: T): ModuleWithProviders<NgxRouteManagerModule> {
    return {
      ngModule: NgxRouteManagerModule,
      providers: [
        {
          provide: NGX_ROUTE_MANAGER_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
