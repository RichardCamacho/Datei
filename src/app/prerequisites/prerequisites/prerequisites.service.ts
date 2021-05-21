import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class PrerequisitesService {
  
  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService) { }

  //registrar prerequisito
  registerPrerequisite(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-prerequisite`, args);
  }

  //obtener lista de todos los registros de prerequisito por curso
  getPrerequisiteByC(idC) {
    return this.http.get(`${this.gateway.url}/api/list-prerequisite/${idC}`);
  }

  //obtener un prerequisito por id
  getPrerequisiteById(id) {
    return this.http.get(`${this.gateway.url}/api/prerequisite/${id}`);
  }

  //editar la informacion de un prerequisito
  updatePrerequisite(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-prerequisite/${id}`, args);
  }

  //eliminar registro
  deletePrerequisite(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-prerequisite/${id}`);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }
}

