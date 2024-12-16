import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomManagerService } from '../../services/custom-route-manager.service';

@Component({
  selector: 'app-fourth',
  standalone: true,
  imports: [RouterLink],
  providers: [CustomManagerService],
  templateUrl: './fourth.component.html',
  styleUrl: './fourth.component.scss'
})
export class FourthComponent {

  constructor(
    public ngxRouteService: CustomManagerService
  ) { }
}
