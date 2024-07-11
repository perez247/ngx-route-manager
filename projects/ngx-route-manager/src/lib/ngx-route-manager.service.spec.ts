import { TestBed } from '@angular/core/testing';

import { NgxRouteManagerService } from './ngx-route-manager.service';

describe('NgxRouteManagerService', () => {
  let service: NgxRouteManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRouteManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
