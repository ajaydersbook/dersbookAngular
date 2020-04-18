import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  constructor(private authService: AuthService) {}
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    localStorage.clear();
    this.authService.loggedIn.next(false);
    window.location.replace('/login');
    return null;
  }
  
}
