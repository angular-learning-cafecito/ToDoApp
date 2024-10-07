import { Component } from '@angular/core';
import {DropConnectedComponent} from '../../../todo-management/components/drop-connected/drop-connected.component';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    DropConnectedComponent
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent {

}
