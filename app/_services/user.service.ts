import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
getAll()
{
  return this.httpClient.get<User[]>(`${environment.apiurl}/users`);
 // return this.httpClient.get<User[]>(`${environment}/users`)
}
getById(id: number) {
  return this.httpClient.get(`${environment.apiurl}/users/${id}`);
}

register(user: User) {
  return this.httpClient.post(`${environment.apiurl}/users/register`, user);
}

update(user: User) {
  return this.httpClient.put(`${environment.apiurl}/users/${user.id}`, user);
}

delete(id: number) {
  return this.httpClient.delete(`${environment.apiurl}/users/${id}`);
}
}



