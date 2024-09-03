import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule, NgFor } from '@angular/common';
import { ICatInfo } from './../../interfaces/cats.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgFor, NgxPaginationModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() cats: ICatInfo | any = [];
  p: number = 1;
}
