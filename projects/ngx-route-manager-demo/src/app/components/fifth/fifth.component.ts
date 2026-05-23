import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  routeManager = inject(NgxRouteManagerService);
}
