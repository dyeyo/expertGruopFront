import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  constructor(private http: HttpClient) {}

  getAllBreeds() {
    return this.http.get(`${environment.url}breeds/`);
  }

  getDataById(id: string) {
    return this.http.get(`${environment.url}breeds/${id}`);
  }

}
