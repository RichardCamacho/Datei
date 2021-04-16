import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from '../_config/config';

@Injectable({
  providedIn: 'root'
})
export class DialogLookupService {

  gateway = CONFIG.gateway;
constructor(private http: HttpClient) { }

  getAllItems(service) {
    console.log(`${this.gateway.url}${service}`)
    return this.http.get(`${this.gateway.url}${service}`);
  }
}
