import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from './../card/card.component';
import { ListCatsComponent } from './list-cats.component';
import { CatsService } from './../../services/cats.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ListCatsComponent', () => {
  let component: ListCatsComponent;
  let fixture: ComponentFixture<ListCatsComponent>;
  let mockCatsService: jasmine.SpyObj<CatsService>;

  beforeEach(async () => {
    const catsServiceSpy = jasmine.createSpyObj('CatsService', ['getAllBreeds']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        CardComponent,
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        { provide: CatsService, useValue: catsServiceSpy }
      ]
    }).compileComponents();

    mockCatsService = TestBed.inject(CatsService) as jasmine.SpyObj<CatsService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set breeds when API call is successful', () => {
    const mockResponse = { cats: [{ id: 1, name: 'Persian' }] };
    mockCatsService.getAllBreeds.and.returnValue(of(mockResponse));
    component.getListCats();
    expect(component.breeds).toEqual(mockResponse.cats);
  });
});
