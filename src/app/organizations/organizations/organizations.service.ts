import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService) { }

  //registrar organización
  registerOrganization(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-organization`, args);
  }

  //obtener lista de todos los registros de organización por hoja de vida
  getOrganizationByHv(idHv) {
    return this.http.get(`${this.gateway.url}/api/list-organization/${idHv}`);
  }

  //obtener una organización por id
  getOrganizationById(id) {
    return this.http.get(`${this.gateway.url}/api/organization/${id}`);
  }

  //editar la informacion de una organización
  updateOrganization(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-organization/${id}`, args);
  }

  deleteOrganization(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-organization/${id}`);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }
}
