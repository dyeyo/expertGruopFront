import { AuthService } from './../../services/auth.service';
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  token: string = "" 
  authServices = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.authServices.getTokenObservable().subscribe((token:any) => {
      this.token = token;
    });
  }

  logout(){
    localStorage.clear()
    this.authServices.getTokenObservable().subscribe((token:any) => {
      this.token = "";
    });
    this.router.navigate(['/']);
  }
}
