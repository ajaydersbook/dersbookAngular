import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `
  <ngx-spinner bdColor="rgba(51,51,51,0.8)" size="medium" color="#77bf39" type="ball-spin">
  <p style="font-size: 20px; color: Red">Loading...</p>
  </ngx-spinner>
  <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
