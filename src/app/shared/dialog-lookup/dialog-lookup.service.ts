import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class DialogLookupService {

  gateway = CONFIG.gateway;
  constructor(private http: HttpClient) { }

  getAllItems(service) {
      return this.http.get(`${this.gateway.url}${service}`);
  }
}
