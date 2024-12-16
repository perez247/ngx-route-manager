import { Injectable, } from '@angular/core';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { NgxRouteType } from '../ngx-routes';

@Injectable()
export class CustomManagerService extends NgxRouteManagerService<NgxRouteType> {}
