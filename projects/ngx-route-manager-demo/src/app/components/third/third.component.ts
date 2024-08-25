import { Component } from '@angular/core';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { RouterLink } from '@angular/router';
import { NgxRouteType } from '../../ngx-routes';

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
