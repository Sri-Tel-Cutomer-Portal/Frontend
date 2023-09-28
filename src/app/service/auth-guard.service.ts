import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { User } from '../Response/user';
import { AuthService } from './auth-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!this.authService.isUserLoggedIn()) {
      alert('You are not allowed to view this page. Returning to login.');
      this.router.navigate(['login'], { queryParams: { retUrl: route.url } });
      return false;
    }

    return true;
  }
}
