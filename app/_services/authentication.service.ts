import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user:Observable<User>;
  private userSubject:BehaviorSubject<User>;
  
  constructor(private router :Router,
    private httpClient :HttpClient) { 
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }
    public get userValue():User{
      return this.userSubject.value;
    }
login (username:string,password:string )
{

  
  return this.httpClient.post<any>( `${environment.apiurl}/users/authenticate`,{username,password})
  .pipe(map(user=>{ localStorage.setItem('user', JSON.stringify(user));
  this.userSubject.next(user);
  return user;}));
 
 
}
logout()
{
  localStorage.removeItem('user');
  this.userSubject.next(null!);
  this.router.navigate(['/login']);

}
}
