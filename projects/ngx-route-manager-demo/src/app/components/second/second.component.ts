import { Component } from '@angular/core';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { RouterLink } from '@angular/router';
import { NgxRouteType } from '../../ngx-routes';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [RouterLink],
  providers: [NgxRouteManagerService],
  templateUrl: './second.component.html',
  styleUrl: './second.component.scss'
})
export class SecondComponent {

  constructor(
    public ngxRouteService: NgxRouteManagerService<NgxRouteType>
  ) { }
}
