import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ngxRoutes } from '../../ngx-routes';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './second.component.html',
  styleUrl: './second.component.scss'
})
export class SecondComponent {
  routes = ngxRoutes;
}
