import { Routes } from '@angular/router';
import {HomeViewComponent} from './public/pages/home-view/home-view.component';

export const routes: Routes = [
  {path:'', component:HomeViewComponent, data:{name: 'Home'}},
];
