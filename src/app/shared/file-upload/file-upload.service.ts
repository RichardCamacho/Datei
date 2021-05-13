import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';
import {HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  gateway = CONFIG.gateway;
   saveFile(DataArgs , urlFileUpload ){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    let data: any;
    data = DataArgs;

    const url = urlFileUpload ; 
    return this.http.post(`${url}`, data, {headers: headers});
   }
}
