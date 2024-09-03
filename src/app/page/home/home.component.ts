import { Component } from '@angular/core';
import { ListCatsComponent } from './../../components/list-cats/list-cats.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListCatsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
