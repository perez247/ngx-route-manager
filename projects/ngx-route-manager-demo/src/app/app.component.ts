import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { NgxRouteType } from './ngx-routes';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  providers: [NgxRouteManagerService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-route-manager-demo';

  constructor(
    public ngxRouteService: NgxRouteManagerService<NgxRouteType>
  ) {
    this.ngxRouteService.routes.fifth.params.state.listenForValue()
  }
}
