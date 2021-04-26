import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private auth: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
  {
    const isLoggedIn = this.auth.isAuthorized;
    const isLoginForm = route.routeConfig.path === 'login';
    if (isLoggedIn && isLoginForm) {
        this.router.navigate(['/']);
        return false;
    }

    if (!isLoggedIn && !isLoginForm) {
        this.router.navigate(['/login']);
    }

    return isLoggedIn || isLoginForm;

  }

}
