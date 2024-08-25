import { TestBed } from '@angular/core/testing';

import { NgxRouteManagerService } from './ngx-route-manager.service';
import { generateNgxRoute } from '../functions/generate-path';
import { InjectionToken } from '@angular/core';

const ngxRoutes = {
  first: generateNgxRoute(''),
}

const NGX_ROUTE_MANAGER_CONFIG = new InjectionToken<any>('NGX_ROUTE_MANAGER_CONFIG');

function routeManagerConfigFactory<T>(config: T): () => T {
  return () => config;
}

// describe('NgxRouteManagerService', () => {
//   let service: NgxRouteManagerService<typeof ngxRoutes>;

//   beforeAll(() => {

//   })

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         {
//           provide: NGX_ROUTE_MANAGER_CONFIG,
//           useFactory: routeManagerConfigFactory(ngxRoutes)
//         }
//       ]
//     });
//     service = TestBed.inject(NgxRouteManagerService<typeof ngxRoutes>);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
