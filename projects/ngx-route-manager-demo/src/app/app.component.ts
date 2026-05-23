import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ngxRoutes } from './ngx-routes';
import { AsyncPipe } from '@angular/common';
import { NgxRouteManagerService } from 'ngx-route-manager';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngx-route-manager-demo';
  routes = ngxRoutes;
  routeManager = inject(NgxRouteManagerService);
  private router = inject(Router);

  navigateTo(url: string) {
    this.router.navigateByUrl('/' + url);
  }
}
