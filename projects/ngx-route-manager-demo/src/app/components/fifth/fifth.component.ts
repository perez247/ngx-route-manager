import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ngxRoutes } from '../../ngx-routes';
import { NgxRouteManagerService } from 'ngx-route-manager';

@Component({
  selector: 'app-fifth',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fifth.component.html',
  styleUrl: './fifth.component.scss'
})
export class FifthComponent {
  routes = ngxRoutes;
  private route = inject(ActivatedRoute);
  private routeManagerService = inject(NgxRouteManagerService);

  constructor() {
    this.routeManagerService.updateRoute(this.route);
  }
}
