import { Component, OnInit } from '@angular/core';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { NgxRouteType } from '../../src/app/ngx-routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [RouterLink],
  providers: [NgxRouteManagerService],
  templateUrl: './first.component.html',
  styleUrl: './first.component.scss'
})
export class FirstComponent {

  constructor(
    public ngxRouteService: NgxRouteManagerService<NgxRouteType>
  ) { }
}
