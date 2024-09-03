import { IUser } from './../../../interfaces/user.interface';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  formBuilder = inject(FormBuilder);
  authServices = inject(AuthService);
  router = inject(Router);
  formRegister!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formRegister = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  sendData() {
    const payload: IUser = {
      email: this.formRegister.get('email')?.value,
      password: this.formRegister.get('password')?.value,
    };
    this.authServices.register(payload).subscribe({
      next: (data: any) => {
        localStorage.setItem('auth',data.token)
        localStorage.setItem('user',JSON.stringify(data.user))
        this.router.navigate(['/welcome'])
      },
      error: (err) => {},
    });
  }

  isFieldInvalid(field: string) {
    return (
      this.formRegister.get(field)?.invalid &&
      (this.formRegister.get(field)?.dirty || this.formRegister.get(field)?.touched)
    );
  }
}
