import { Component } from '@angular/core';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { NgxRouteType } from '../../src/app/ngx-routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-third',
  standalone: true,
  imports: [RouterLink],
  providers: [NgxRouteManagerService],
  templateUrl: './third.component.html',
  styleUrl: './third.component.scss'
})
export class ThirdComponent {

  constructor(
    public ngxRouteService: NgxRouteManagerService<NgxRouteType>
  ) { }
}
