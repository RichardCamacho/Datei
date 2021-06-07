import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SoFoldersService } from 'src/app/so-folders/so-folders/so-folders.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class SoFoldersInfoService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient,
              private soFoldersServices: SoFoldersService) { }

  getAllSoFolders(ind){
    return this.soFoldersServices.getAllSoFoldersDetail(ind);
  }
}
