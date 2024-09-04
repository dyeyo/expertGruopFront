import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './../../../services/auth.service';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: jasmine.SpyObj<AuthService>; // Update type definition
  let formBuilder: FormBuilder;
  let router: Router; 

  beforeEach(() => {
    formBuilder = new FormBuilder();
    authService = jasmine.createSpyObj('AuthService', ['register']);
    authService.register.and.returnValue(of({})); // This line causes the error
    router = jasmine.createSpyObj('Router', ['navigate']);
    component = new LoginComponent(router, formBuilder, authService);
  });

  it('should create the form', () => {
    component.createForm();
    expect(component.formLogin).toBeDefined();
    expect(component.formLogin.get('email')).toBeDefined();
    expect(component.formLogin.get('password')).toBeDefined();
  });

  it('Debe enviar datos y navegar a la bienvenida después de logenadose exitosamente.', () => {
    const mockData = {
      token: 'mockToken',
      user: { email: 'dyegovallejo@gmail.com', password: '123456789' },
    };
  
    // Mock form values
    component.formLogin = {
      get: jasmine
        .createSpy()
        .and.returnValues({ value: 'dyegovallejo@gmail.com' }, { value: '123456789' }),
    } as any;
  
    spyOn(component.authService, 'login').and.returnValue(of(mockData));
  
    spyOn(component.router, 'navigate');
  
    component.login();
  
    expect(localStorage.getItem('auth')).toBe('mockToken');
    expect(localStorage.getItem('user')).toBe(
      JSON.stringify({ id: 1, email: 'dyegovallejo@gmail.com' })
    );
    expect(component.router.navigate).toHaveBeenCalledWith(['/welcome']);
  });
});