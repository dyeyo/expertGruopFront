import { RegistroComponent } from './registro.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let formBuilder: FormBuilder;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    authService = jasmine.createSpyObj('AuthService', ['register']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    component = new RegistroComponent(router, formBuilder, authService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario en ngOnInit', () => {
    component.ngOnInit();
    expect(component.formRegister).toBeDefined();
  });

  it('Debería crear un formulario con controles de correo electrónico y contraseña.', () => {
    component.createForm();
    expect(component.formRegister.get('email')).toBeDefined();
    expect(component.formRegister.get('password')).toBeDefined();
  });

  it('Debe registrar un usuario y navegar a la página de bienvenida cuando el correo electrónico y la contraseña sean válidos', () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['register']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const formBuilder = new FormBuilder();
    const component = new RegistroComponent(
      routerMock,
      formBuilder,
      authServiceMock
    );

    component.ngOnInit();
    component.formRegister.setValue({
      email: 'test@gmail.com',
      password: '123456789',
    });

    const response = {
      token: 'jwttoken',
      user: { id: 1, email: 'test@gmail.com' },
    };

    authServiceMock.register.and.returnValue(of(response));

    component.sendData();

    expect(localStorage.getItem('auth')).toBe('jwttoken');
    expect(localStorage.getItem('user')).toBe(JSON.stringify(response.user));
    expect(routerMock.navigate).toHaveBeenCalledWith(['/welcome']);
  });
});
