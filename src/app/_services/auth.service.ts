import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


const ACCESS_TOKEN_KEY = '_at';
const USER_KEY = '_u';
const REQUEST_TIME_KEY = '_requested';
const ACCESS_TOKEN_TIME_KEY = '_att';

@Injectable()
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  private redirectUrl = '/';

  get isLoggedIn() {
    console.log('logged in in get logged in', this.loggedIn)
    return this.loggedIn.asObservable();
  }
  storeToken(data) {
    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(data));
    localStorage.setItem(REQUEST_TIME_KEY, new Date().toString());
  }

  storeTokenTime(data) {
    localStorage.setItem(ACCESS_TOKEN_TIME_KEY, JSON.stringify(data));
  }

  constructor() {
  
    if (this.validateToken()) {
      
      this.loggedIn.next(true);
    }
   }

   validateToken() {
    const session = localStorage.getItem(ACCESS_TOKEN_TIME_KEY);
    console.log('ACCESS_TOKEN_TIME_KEY', ACCESS_TOKEN_TIME_KEY)
    console.log('session ', session)
    if (session === 'undefined') {
        return false;
    }
    
    if (session) {
        const requested = localStorage.getItem(REQUEST_TIME_KEY);
        if (!requested) {
            return false;
        }
        const startDate = new Date(requested);
        const endDate = new Date();
        const seconds = Math.abs((endDate.getTime() - startDate.getTime()) / 1000);

        if (seconds > Number(session)) {
           //this.logout();
           return false;
        } else if (seconds < Number( session)) {
            return true;
        } else {
            this.logout();
        }
    }
    return false;
}

logout() {
  localStorage.clear();
  this.loggedIn.next(false);
  window.location.replace('/login');
  return null;
}


  
}
