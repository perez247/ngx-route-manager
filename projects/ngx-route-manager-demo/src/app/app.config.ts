import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ngxRoutes, NgxRouteType } from './ngx-routes';
import { NgxRouteManagerModule } from 'ngx-route-manager';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    // add into application.....
    // for v17 (standalone) and above
    importProvidersFrom(NgxRouteManagerModule.forRoot<NgxRouteType>(ngxRoutes)),

    // For ngModules v16 (non standalone), in the imports array
    // NgxRouteManagerModule.forRoot<NgxRouteType>(ngxRoutes)

    provideRouter(routes)]
};
