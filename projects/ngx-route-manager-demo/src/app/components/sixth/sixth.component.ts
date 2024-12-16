import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomNgxRmDirective } from '../../directives/custom-ngx-rm.directive';

@Component({
  selector: 'app-sixth',
  standalone: true,
  imports: [RouterLink, CustomNgxRmDirective],
  templateUrl: './sixth.component.html',
  styleUrl: './sixth.component.scss'
})
export class SixthComponent {
}
