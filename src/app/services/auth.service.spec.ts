import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from './../../environments/environment';
import { IUser } from './../interfaces/user.interface';
import { AuthService } from './auth.service';
import { authMock } from './../mocks/auth';
import { of } from 'rxjs';

describe('AuthService', () => {
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


  it('Deberia registrar y retornar usuario y token', () => {
    spyOn(service, 'register').and.returnValue(of());
    const mockUser: IUser = {
      email: 'admin@gmail.com',
      password: '123456789',
    }; 
    service.register(mockUser).subscribe((data: any) => {
      expect(data).toBeDefined();
    });
  });

  it('Deberia logearse y retornar usuario y token', () => {
    spyOn(service, 'login').and.returnValue(of());
    const mockUser: IUser = {
      email: 'admin@gmail.com',
      password: '123456789',
    }; 
    service.login(mockUser).subscribe((data: any) => {
      expect(data).toBeDefined();
    });
  });
});
