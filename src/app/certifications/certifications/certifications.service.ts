import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class CertificationsService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService) { }

  //registrar certificacion
  registerCertification(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-certification`, args);
  }

  //obtener lista de todos los registros de certificaciones por hoja de vida
  getCertificationByHv(idHv) {
    return this.http.get(`${this.gateway.url}/api/list-certification/${idHv}`);
  }

  //obtener una certificacion por id
  getCertificationById(id) {
    return this.http.get(`${this.gateway.url}/api/certification/${id}`);
  }

  //editar la informacion de una certificacion
  updateCertification(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-certification/${id}`, args);
  }

  deleteCertification(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-certification/${id}`);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }
}
