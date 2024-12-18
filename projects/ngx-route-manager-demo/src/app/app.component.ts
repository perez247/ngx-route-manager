import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ngxRoutes } from './ngx-routes';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-route-manager-demo';
  routes = ngxRoutes;

  constructor() {}
}
