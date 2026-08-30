import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgxRouteManagerService } from '../lib/services/ngx-route-manager.service';
import { NgxParam } from '../lib/models/ngx-param';
import { NgxQueryParam } from '../lib/models/ngx-query-params';
import { internalSignalRoute } from '../lib/functions/listenForRouteChange';

describe('NgxRouteManagerService and NgxParam/NgxQueryParam', () => {
  let service: NgxRouteManagerService;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let paramMapSubject: BehaviorSubject<ParamMap>;
  let queryParamMapSubject: BehaviorSubject<ParamMap>;

  beforeEach(() => {
    internalSignalRoute.set(undefined);
    paramMapSubject = new BehaviorSubject<ParamMap>(convertToParamMap({ id: '999', userRole: 'admin' }));
    queryParamMapSubject = new BehaviorSubject<ParamMap>(convertToParamMap({ state: 'active', q: 'search' }));

    mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ id: '999', userRole: 'admin' }),
        queryParamMap: convertToParamMap({ state: 'active', q: 'search' }),
      } as any,
      paramMap: paramMapSubject.asObservable(),
      queryParamMap: queryParamMapSubject.asObservable(),
    };

    TestBed.configureTestingModule({
      providers: [NgxRouteManagerService],
    });
    service = TestBed.inject(NgxRouteManagerService);
  });

  it('should update internalSignalRoute when updateRoute is called on service', () => {
    service.updateRoute(mockActivatedRoute as ActivatedRoute);
    expect(service.currentRoute).toBe(mockActivatedRoute as ActivatedRoute);
    expect(internalSignalRoute()).toBe(mockActivatedRoute as ActivatedRoute);
  });

  it('should update internalSignalRoute when setRoute or updateActivatedRoute is called', () => {
    service.setRoute(mockActivatedRoute as ActivatedRoute);
    expect(internalSignalRoute()).toBe(mockActivatedRoute as ActivatedRoute);

    service.updateActivatedRoute(mockActivatedRoute as ActivatedRoute);
    expect(internalSignalRoute()).toBe(mockActivatedRoute as ActivatedRoute);
  });

  it('snapshotValue in NgxParam should update internalSignalRoute if ActivatedRoute is passed directly', () => {
    const param = new NgxParam('id');
    const val = param.snapshotValue(mockActivatedRoute as ActivatedRoute);
    expect(val).toBe('999');
    expect(internalSignalRoute()).toBe(mockActivatedRoute as ActivatedRoute);
  });

  it('snapshotValue in NgxParam should read from internalSignalRoute if service updated it previously', () => {
    service.updateRoute(mockActivatedRoute as ActivatedRoute);
    const param = new NgxParam('userRole');
    expect(param.snapshotValue()).toBe('admin');
  });

  it('snapshotValue in NgxParam should return empty string if no route is set', () => {
    const param = new NgxParam('id');
    expect(param.snapshotValue()).toBe('');
  });

  it('listenForValue in NgxParam should update route if passed and emit value', (done) => {
    const param = new NgxParam('id');
    param.listenForValue(mockActivatedRoute as ActivatedRoute).subscribe((val) => {
      expect(val).toBe('999');
      done();
    });
  });

  it('snapshotValue in NgxQueryParam should return query param value when route is updated', () => {
    service.updateRoute(mockActivatedRoute as ActivatedRoute);
    const queryParam = new NgxQueryParam('state');
    expect(queryParam.snapshotValue()).toBe('active');
  });

  it('listenForValue in NgxQueryParam should emit query param value when route is updated', (done) => {
    const queryParam = new NgxQueryParam('q');
    queryParam.listenForValue(mockActivatedRoute as ActivatedRoute).subscribe((val) => {
      expect(val).toBe('search');
      done();
    });
  });
});
