import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from './../../environments/environment';
import { IUser } from './../interfaces/user.interface';
import { AuthService } from './auth.service';

xdescribe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
   TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

 it('should register a user and set token', () => {
    const mockUser: IUser = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { token: 'mockToken' };

    service.register(mockUser).subscribe((data: any) => {
      expect(data.token).toBe('mockToken');
    });

    const req = httpMock.expectOne(`${environment.url}user/register/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);

    req.flush(mockResponse);

    expect(service.getToken()).toBe('mockToken');
  });

  it('should login a user and set token', () => {
    const mockUser: IUser = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { token: 'mockToken' };

    service.login(mockUser).subscribe((data: any) => {
      expect(data.token).toBe('mockToken');
    });

    const req = httpMock.expectOne(`${environment.url}user/login/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);

    req.flush(mockResponse);

    expect(service.getToken()).toBe('mockToken');
  });
});
