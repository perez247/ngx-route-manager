import { Component } from '@angular/core';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { RouterLink } from '@angular/router';
import { NgxRouteType } from '../../ngx-routes';

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
