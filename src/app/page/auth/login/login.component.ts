import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from './../../../services/auth.service';
import { IUser } from './../../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  authServices = inject(AuthService);
  router = inject(Router);
  formLogin!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const payload: IUser = {
      email: this.formLogin.get('email')?.value,
      password: this.formLogin.get('password')?.value,
    };
    this.authServices.login(payload).subscribe({
      next: (data: any) => {
        localStorage.setItem('auth', data.token);
        localStorage.setItem('user', JSON.stringify(data.usuario));
        this.authServices.setToken(data.token);
        this.router.navigate(['/welcome']);
      },
      error: (err: any) => {},
    });
  }

  isFieldInvalid(field: string) {
    return (
      this.formLogin.get(field)?.invalid &&
      (this.formLogin.get(field)?.dirty || this.formLogin.get(field)?.touched)
    );
  }
}
