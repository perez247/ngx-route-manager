import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { NgxRouteManagerService } from './lib/services/ngx-route-manager.service';
import { NgxRmDirective } from './lib/directives/ngx-rm.directive';


export const NGX_ROUTE_MANAGER_CONFIG = new InjectionToken<any>('NGX_ROUTE_MANAGER_CONFIG');
export const NGX_ROUTE_MANAGER_TYPE = new InjectionToken<any>('NGX_ROUTE_MANAGER_TYPE');

export function routeManagerConfigFactory<T>(config: T): () => T {
  return () => config;
}
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
          useFactory: routeManagerConfigFactory(config)
        },
        {
          provide: NGX_ROUTE_MANAGER_TYPE,
          useValue: typeof config
        }
      ]
    };
  }
}
