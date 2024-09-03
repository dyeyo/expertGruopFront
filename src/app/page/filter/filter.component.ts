import { FilterByNamePipe } from './../../pipes/filter-by-name.pipe';
import { ICats, Breed } from './../../interfaces/cats.interface';
import { CatsService } from './../../services/cats.service';
import { NgFor, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TableComponent } from './../../components/table/table.component';
import { Component, inject, OnInit } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, TableComponent, FilterByNamePipe,NgxPaginationModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  catsServices = inject(CatsService);
  formFilter!: FormGroup;
  breeds: Breed[] = [];
  filterpost: string = '';
  searchText: string = '';
  p: number = 1;
  ngOnInit(): void {
    this.getDataCatByBreeds();
  }

  getDataCatByBreeds() {
    this.catsServices.getAllBreeds().subscribe({
      next: (data: any) => {
        this.breeds = data.cats;
      },
    });
  }
}
