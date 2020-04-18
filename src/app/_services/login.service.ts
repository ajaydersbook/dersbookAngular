import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constant:Constant;

  constructor(private http: HttpClient) { }

   login(data: any): Observable<any> {
       console.log('data', data)
       return this.http.post('http://localhost:64318/Login', data)
   }
  
}
