import { Injectable } from '@angular/core';
import { User } from '../Response/user';
import { LoginService } from './login.service';
import { of } from 'rxjs';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  id: number;

  private isloggedIn: boolean;
  user: User = new User();

  constructor(
    private loginuserService: LoginService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.isloggedIn = false;
  }

  login(userName: string, password: string) {
    this.user.userName = userName;
    this.user.password = password;
    this.loginuserService.loginUser(this.user).subscribe({
      next: (data) => {
        this.isloggedIn = true;

        //pass the userId to the other components
        this.sharedService.setUserId(data);
        //pass the userName to the other components
        this.sharedService.setUserName(this.user.userName);
        console.log(this.user.userName);
        this.router.navigate(['plans']);

        alert('Login Successful');
        return of(this.isloggedIn);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        alert('Sorry, please enter correct Username and Password');
      },
    });
  }

  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }

  logoutUser(): void {
    this.isloggedIn = false;
  }
}
