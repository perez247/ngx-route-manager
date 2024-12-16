import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomManagerService } from '../../services/custom-route-manager.service';

@Component({
  selector: 'app-fifth',
  standalone: true,
  imports: [RouterLink],
    providers: [CustomManagerService],
  templateUrl: './fifth.component.html',
  styleUrl: './fifth.component.scss'
})
export class FifthComponent {

  constructor(
    public ngxRouteService: CustomManagerService
  ) { }
}
