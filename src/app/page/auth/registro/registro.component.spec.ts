import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegistroComponent } from './registro.component';
import { AuthService } from './../../../services/auth.service';

xdescribe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegistroComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form on init', () => {
    component.ngOnInit();
    expect(component.formRegister).toBeTruthy();
    expect(component.formRegister.get('email')).toBeTruthy();
    expect(component.formRegister.get('password')).toBeTruthy();
  });

  it('should call register method on sendData', () => {
    const payload = { email: 'test@example.com', password: 'password' };
    const mockResponse = { token: '12345', user: payload };
    mockAuthService.register.and.returnValue(of(mockResponse));
    const navigateSpy = spyOn(mockRouter, 'navigate');

    component.formRegister.setValue(payload);
    component.sendData();

    expect(mockAuthService.register).toHaveBeenCalledWith(payload);
    expect(localStorage.getItem('auth')).toBe('12345');
    expect(localStorage.getItem('user')).toBe(JSON.stringify(payload));
    expect(navigateSpy).toHaveBeenCalledWith(['/welcome']);
  });

  it('should handle error in sendData', () => {
    mockAuthService.register.and.returnValue(throwError(() => new Error('Error')));
    const navigateSpy = spyOn(mockRouter, 'navigate');

    component.sendData();

    expect(mockAuthService.register).toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should determine if a field is invalid', () => {
    component.formRegister.setValue({ email: '', password: '' });
    component.formRegister.get('email')?.markAsTouched();
    component.formRegister.get('password')?.markAsTouched();

    expect(component.isFieldInvalid('email')).toBe(true);
    expect(component.isFieldInvalid('password')).toBe(true);
  });
});
