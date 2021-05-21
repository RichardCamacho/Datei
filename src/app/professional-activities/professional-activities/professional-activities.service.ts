import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalActivitiesService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService) { }

  //registrar actividad profesional
  registerProfessionalActivity(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-professional-activ`, args);
  }

  //obtener lista de todos los registros de actividad profesional por hoja de vida
  getProfessionalActivityByHv(idHv) {
    return this.http.get(`${this.gateway.url}/api/list-professional-activ/${idHv}`);
  }

  //obtener una actividad profesional por id
  getProfessionalActivityById(id) {
    return this.http.get(`${this.gateway.url}/api/professional-activ/${id}`);
  }

  //editar la informacion de una actividad profesional
  updateProfessionalActivity(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-professional-activ/${id}`, args);
  }

  //eliminar registro
  deleteProfessionalActivity(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-professional-activ/${id}`);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }
}
