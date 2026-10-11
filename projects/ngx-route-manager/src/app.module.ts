import { NgModule, ModuleWithProviders, InjectionToken, APP_INITIALIZER } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { listenForRouteChange } from './lib/functions/listenForRouteChange';
import { NgxRouteManagerService } from './lib/services/ngx-route-manager.service';

export const NGX_ROUTE_MANAGER_CONFIG = new InjectionToken<any>('NGX_ROUTE_MANAGER_CONFIG');

@NgModule({})
export class NgxRouteManagerModule {
  static forRoot(config: any): ModuleWithProviders<NgxRouteManagerModule> {
    return {
      ngModule: NgxRouteManagerModule,
      providers: [
        NgxRouteManagerService,
        {
          provide: NGX_ROUTE_MANAGER_CONFIG,
          useValue: config
        },
        {
          provide: APP_INITIALIZER,
          useFactory: listenForRouteChange,
          deps: [Router, ActivatedRoute],
          multi: true
        }
      ]
    };
  }
}
