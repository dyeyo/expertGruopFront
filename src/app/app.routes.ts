import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { RegistroComponent } from './page/auth/registro/registro.component';
import { LoginComponent } from './page/auth/login/login.component';
import { FilterComponent } from './page/filter/filter.component';
import { HomeComponent } from './page/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
];
