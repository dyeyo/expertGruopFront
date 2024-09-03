import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FilterByNamePipe } from './../../pipes/filter-by-name.pipe';
import { ICatInfo } from './../../interfaces/cats.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NgFor, NgxPaginationModule,FilterByNamePipe,NgxPaginationModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() breeds: ICatInfo | any = [];
  @Input() searchText: string = '';
  p: number = 1;
}
