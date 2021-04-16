import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { User } from './user';
import { users } from './user-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRxjsServiceService {

  constructor(private http: HttpClient) { }

  private users: User[] = users;

  // getUsers(): Observable<User> {
  // You can also fetch data from Api using HttpClient.
  //   return this.http.get(url..)
  // }

  getUsers(): Observable<User> {
    return from(this.users);
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }

  addUser(user: User): void {
    this.users?.push(user);
  }

  updateUser(index: number, user: User): void {
    this.users[index] = user;
  }

}
