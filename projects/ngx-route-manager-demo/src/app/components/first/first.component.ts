import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomManagerService } from '../../services/custom-route-manager.service';

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [RouterLink],
  providers: [CustomManagerService],
  templateUrl: './first.component.html',
  styleUrl: './first.component.scss'
})
export class FirstComponent {

  constructor(
    public ngxRouteService: CustomManagerService
  ) { }
}
