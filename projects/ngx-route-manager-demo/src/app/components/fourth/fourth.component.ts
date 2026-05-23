import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ngxRoutes } from '../../ngx-routes';
import { NgxRouteManagerService } from 'ngx-route-manager';

@Component({
  selector: 'app-fourth',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fourth.component.html',
  styleUrl: './fourth.component.scss'
})
export class FourthComponent {
  routes = ngxRoutes;
  routeManager = inject(NgxRouteManagerService);
}
