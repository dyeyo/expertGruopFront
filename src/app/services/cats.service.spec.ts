import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from './../../environments/environment';

import { CatsService } from './cats.service';

xdescribe('CatsService', () => {
  let service: CatsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatsService],
    });
    service = TestBed.inject(CatsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all breeds', () => {
    const mockBreeds = { cats: [{ id: '1', name: 'Breed 1' }] };

    service.getAllBreeds().subscribe((data: any) => {
      expect(data).toEqual(mockBreeds);
    });

    const req = httpMock.expectOne(`${environment.url}breeds/`);
    expect(req.request.method).toBe('GET');

    req.flush(mockBreeds);
  });

  it('should get breed data by id', () => {
    const mockId = '1';
    const mockBreedData = { breed: [{ id: '1', name: 'Breed 1' }] };

    service.getDataById(mockId).subscribe((data: any) => {
      expect(data).toEqual(mockBreedData);
    });

    const req = httpMock.expectOne(`${environment.url}breeds/${mockId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockBreedData);
  });
});
