import { Component } from '@angular/core';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { NgxRouteType } from '../../src/app/ngx-routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fourth',
  standalone: true,
  imports: [RouterLink],
  providers: [NgxRouteManagerService],
  templateUrl: './fourth.component.html',
  styleUrl: './fourth.component.scss'
})
export class FourthComponent {

  constructor(
    public ngxRouteService: NgxRouteManagerService<NgxRouteType>
  ) { }
}
