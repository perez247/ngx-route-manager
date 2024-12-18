import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ngxRoutes } from '../../ngx-routes';

@Component({
  selector: 'app-fourth',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fourth.component.html',
  styleUrl: './fourth.component.scss'
})
export class FourthComponent {
  routes = ngxRoutes;
}
