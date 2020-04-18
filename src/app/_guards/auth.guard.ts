import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authservice: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
      return this.authservice.loggedIn.pipe(take(1), map((isLoggedIn: boolean) => {
         if(!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
         }
         return true;
      }));
     
  }
  
}
