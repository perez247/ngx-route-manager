import { Component } from '@angular/core';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { RouterLink } from '@angular/router';
import { NgxRouteType } from '../../ngx-routes';

@Component({
  selector: 'app-fifth',
  standalone: true,
  imports: [RouterLink],
  providers: [NgxRouteManagerService],
  templateUrl: './fifth.component.html',
  styleUrl: './fifth.component.scss'
})
export class FifthComponent {

  constructor(
    public ngxRouteService: NgxRouteManagerService<NgxRouteType>
  ) { }
}
