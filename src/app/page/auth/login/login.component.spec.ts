import { AuthService } from './../../../services/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login', 'setToken']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with validators', () => {
    component.createForm();
    expect(component.formLogin).toBeDefined();
    expect(component.formLogin.get('email')).toBeTruthy();
    expect(component.formLogin.get('password')).toBeTruthy();
    expect(component.formLogin.get('email')?.hasValidator(Validators.required)).toBeTrue();
    expect(component.formLogin.get('email')?.hasValidator(Validators.email)).toBeTrue();
    expect(component.formLogin.get('password')?.hasValidator(Validators.required)).toBeTrue();
  });

  it('should login and set token on successful login', () => {
    const mockResponse = { token: 'mockToken', usuario: { id: 1, name: 'John Doe' } };
    mockAuthService.login.and.returnValue(of(mockResponse));

    component.formLogin.get('email')?.setValue('test@example.com');
    component.formLogin.get('password')?.setValue('password123');
    component.login();

    expect(mockAuthService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(localStorage.getItem('auth')).toBe('mockToken');
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.usuario));
    expect(mockAuthService.setToken).toHaveBeenCalledWith('mockToken');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/welcome']);
  });

  it('should handle login error', () => {
    mockAuthService.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.formLogin.get('email')?.setValue('test@example.com');
    component.formLogin.get('password')?.setValue('password123');
    component.login();

    expect(mockAuthService.login).toHaveBeenCalled();
  });
});
