import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class AcademicExperienceService {
  
  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService) { }

  //registrar experiencia academica
  registerAcademicExp(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-academic-exp`, args);
  }

  //obtener lista de todos los registros de experiencia academica por hoja de vida
  getAcademicExpByHv(idHv) {
    return this.http.get(`${this.gateway.url}/api/list-academic-exp/${idHv}`);
  }

  //obtener un experiencia academica por id
  getAcademicExpById(id) {
    return this.http.get(`${this.gateway.url}/api/academic-exp/${id}`);
  }

  //editar la informacion de un experiencia academica
  updateAcademicExp(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-academic-exp/${id}`, args);
  }

  //eliminar un registro de experiencia academica
  deleteAcademicExp(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-academic-exp/${id}`);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }
}

