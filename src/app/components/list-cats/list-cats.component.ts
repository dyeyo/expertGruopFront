import { CardComponent } from './../card/card.component';
import { TableComponent } from './../table/table.component';

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

import { ICats, ICat } from './../../interfaces/cats.interface';
import { CatsService } from './../../services/cats.service';

@Component({
  selector: 'app-list-cats',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink, ReactiveFormsModule, CardComponent],
  templateUrl: './list-cats.component.html',
  styleUrl: './list-cats.component.scss',
})
export class ListCatsComponent implements OnInit{
  formBuilder = inject(FormBuilder);
  catsServices = inject(CatsService);
  formFilter!: FormGroup;
  breeds!: ICats | any;
  cats!: any;
  currentSlide = 0;

  ngOnInit(): void {
    this.getListCats();
    this.createForm();
  }

  createForm() {
    this.formFilter = this.formBuilder.group({
      filter: [''],
    });
  }

  getListCats() {
    this.catsServices.getAllBreeds().subscribe({
      next: (data: any) => {
        this.breeds = data.cats;
      },
      error: (err) => {},
    });
  }

  getImgCatByBreeds() {
    const breeds = this.formFilter.get('filter')?.value;
    this.catsServices.getDataById(breeds).subscribe({
      next: (data: any) => {
        this.cats = data.breed.map((c: any) => {
          const breed = c.breeds[0];
          return {
            id: breed.id,
            name: breed.name,
            cfa_url: breed.cfa_url,
            vetstreet_url: breed.vetstreet_url,
            vcahospitals_url: breed.vcahospitals_url,
            temperament: breed.temperament,
            origin: breed.origin,
            country_codes: breed.country_codes,
            country_code: breed.country_code,
            description: breed.description,
            url: c.url,
            width: c.width,
            height: c.height,
          };
        });
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.cats.length;
  }

  previousSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.cats.length) % this.cats.length;
  }
}
