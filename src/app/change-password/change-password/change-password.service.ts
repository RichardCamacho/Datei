import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  gateway = CONFIG.gateway;
  
  constructor(private http: HttpClient) { }

  changePassword(dataArgs, id){
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/change-password/${id}`, args);
  }
}
