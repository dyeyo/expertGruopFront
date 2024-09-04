
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatsService } from './cats.service';
import { environment } from './../../environments/environment';

describe('CatsService', () => {
  let service: CatsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatsService]
    });
    service = TestBed.inject(CatsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debería devolver razas cuando se llama a getAllBreeds', () => {
    const mockBreeds = ['breed1', 'breed2'];

    service.getAllBreeds().subscribe((breeds: any) => {
      expect(breeds).toEqual(mockBreeds);
    });

    const req = httpTestingController.expectOne(`${environment.url}breeds/`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBreeds);
  });

  it('Debe devolver datos de una raza específica cuando se llama a getDataById', () => {
    const mockBreedId = '123';
    const mockBreedData = { id: '123', name: 'Breed Name' };

    service.getDataById(mockBreedId).subscribe((data: any) => {
      expect(data).toEqual(mockBreedData);
    });

    const req = httpTestingController.expectOne(`${environment.url}breeds/${mockBreedId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBreedData);
  });

  it('Debería manejar errores cuando se llama a getAllBreeds', () => {
    const errorMessage = 'Error fetching breeds';

    service.getAllBreeds().subscribe(
      () => fail('Expected to fail'),
      (error: any) => {
        expect(error).toBeTruthy();
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpTestingController.expectOne(`${environment.url}breeds/`);
    expect(req.request.method).toEqual('GET');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});