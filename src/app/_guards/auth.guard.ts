import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authservice: AuthService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.authservice.isLoggedIn.pipe(take(1), map((isLoggedIn: boolean) => {
        console.log('working')
         if(!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
         }
         return true;
      }));
  }
  
}
