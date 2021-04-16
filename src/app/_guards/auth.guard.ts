import { LoginService } from './../_services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private loginService: LoginService ,  private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authUserLogin (route, state);
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authUserLogin (route, state);
  }

  private authUserLogin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUserLoginIn = this.loginService.isLoggedIn();
    if (currentUserLoginIn) {
      return true;
    }
    // No login, se direcciona a la pagina principal
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
  }
}