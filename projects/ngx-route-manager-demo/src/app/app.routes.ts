import { Routes } from '@angular/router';
import { ngxRoutes } from './ngx-routes';
import { FifthComponent } from './components/fifth/fifth.component';
import { FirstComponent } from './components/first/first.component';
import { FourthComponent } from './components/fourth/fourth.component';
import { SecondComponent } from './components/second/second.component';
import { ThirdComponent } from './components/third/third.component';
import { SixthComponent } from './components/sixth/sixth.component';

export const routes: Routes = [
  {
    path: ngxRoutes.first.path,
    component: FirstComponent,
  },
  {
    path: ngxRoutes.second.path,
    component: SecondComponent
  },
  {
    path: ngxRoutes.third.path,
    component: ThirdComponent,
  },
  {
    path: ngxRoutes.fourth.path,
    component: FourthComponent
  },
  {
    path: ngxRoutes.fifth.path,
    component: FifthComponent
  },
  {
    path: ngxRoutes.sixth.path,
    component: SixthComponent
  }

];

