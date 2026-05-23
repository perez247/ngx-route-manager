import { Component, inject, OnInit } from '@angular/core';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { ngxRoutes } from '../../ngx-routes';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-third',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './third.component.html',
  styleUrl: './third.component.scss',
})
export class ThirdComponent implements OnInit {
  routeManager = inject(NgxRouteManagerService);
  activatedRoute = inject(ActivatedRoute);
  routes = ngxRoutes;

  paramsSnapshot: any;
  queryParamsSnapshot: any;

  ngOnInit(): void {
    // Passing the current activatedRoute to demonstrate the capability
    this.paramsSnapshot = {
      id: this.routeManager.getParamSnapshot(
        this.routes.third.params.id,
        this.activatedRoute
      ),
      type: this.routeManager.getParamSnapshot(
        this.routes.third.params.type,
        this.activatedRoute
      ),
    };

    this.queryParamsSnapshot = {
      state: this.routeManager.getQueryParamSnapshot(
        this.routes.third.queryParams.state,
        this.activatedRoute
      ),
      q: this.routeManager.getQueryParamSnapshot(
        this.routes.third.queryParams.q,
        this.activatedRoute
      ),
    };
  }
}
