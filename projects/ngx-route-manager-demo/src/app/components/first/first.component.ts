import { Component, OnInit } from '@angular/core';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { RouterLink } from '@angular/router';
import { NgxRouteType } from '../../ngx-routes';

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
