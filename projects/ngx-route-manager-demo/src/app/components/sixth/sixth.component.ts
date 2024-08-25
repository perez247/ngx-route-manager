import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxRmDirective } from 'ngx-route-manager';
import { NgxRouteType } from '../../ngx-routes';

@Component({
  selector: 'app-sixth',
  standalone: true,
  imports: [RouterLink, NgxRmDirective],
  templateUrl: './sixth.component.html',
  styleUrl: './sixth.component.scss'
})
export class SixthComponent {
  routeType: NgxRouteType = {} as NgxRouteType;
}
