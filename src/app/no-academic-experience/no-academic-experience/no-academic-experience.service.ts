import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class NoAcademicExperienceService {
  
  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService) { }

  //registrar experiencia no academica
  registerNoAcademicExp(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-no-academic-exp`, args);
  }

  //obtener lista de todos los registros de experiencia no academica por hoja de vida
  getNoAcademicExpByHv(idHv) {
    return this.http.get(`${this.gateway.url}/api/list-no-academic-exp/${idHv}`);
  }

  //obtener un experiencia no academica por id
  getNoAcademicExpById(id) {
    return this.http.get(`${this.gateway.url}/api/no-academic-exp/${id}`);
  }

  //editar la informacion de un experiencia no academica
  updateNoAcademicExp(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-no-academic-exp/${id}`, args);
  }

  deleteNoAcademicExp(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-no-academic-exp/${id}`);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }
}
