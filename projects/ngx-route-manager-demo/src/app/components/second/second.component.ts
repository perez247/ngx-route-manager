import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomManagerService } from '../../services/custom-route-manager.service';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [RouterLink],
  providers: [CustomManagerService],
  templateUrl: './second.component.html',
  styleUrl: './second.component.scss'
})
export class SecondComponent {

  constructor(
    public ngxRouteService: CustomManagerService
  ) { }
}
