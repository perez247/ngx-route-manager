import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ngxRoutes } from '../../ngx-routes';

@Component({
  selector: 'app-third',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './third.component.html',
  styleUrl: './third.component.scss'
})
export class ThirdComponent {
  routes = ngxRoutes;
}
