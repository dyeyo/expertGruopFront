import { IUser } from './../../interfaces/user.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  user: any = [];

  ngOnInit(): void {
    this.getDataUser();
  }

  getDataUser() {
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : null;
    console.log('user', typeof this.user);
  }
}
