import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Response/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiServeUrl = environment.Url;
  constructor(private httpClient: HttpClient) {}

  loginUser(user: User): Observable<object> {
    return this.httpClient.post(`${this.apiServeUrl}/user/login`, user);
  }
}
