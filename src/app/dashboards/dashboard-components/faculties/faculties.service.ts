import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferencesTypeDetailService } from 'src/app/references-type/references-type-detail/references-type-detail.service';
import { RegisterUsersService } from 'src/app/users/register-users/register-users.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class FacultiesService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient,
              private userService: RegisterUsersService,
              private referencesTypeDetailService: ReferencesTypeDetailService) { }

  getAllUsersByProgram(id){
    return this.userService.getAllUsersByProgram(id);
  }

  //buscar el curso
  getCursoInfo(id){
    return this.referencesTypeDetailService.getReferenceTypeDetailById(id);
  }
}
