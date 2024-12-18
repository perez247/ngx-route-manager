import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ngxRoutes } from '../../ngx-routes';

@Component({
  selector: 'app-sixth',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sixth.component.html',
  styleUrl: './sixth.component.scss'
})
export class SixthComponent {
  routes = ngxRoutes;
}
