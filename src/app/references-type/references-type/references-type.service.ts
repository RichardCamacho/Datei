import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';
import { ReferencesTypeDetailService } from '../references-type-detail/references-type-detail.service';

@Injectable({
  providedIn: 'root'
})
export class ReferencesTypeService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referenceTypeDetailService: ReferencesTypeDetailService) { }

  //registrar tipo de referencia
  registerReferenceType(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-reference-type`, args);
  }

  //obtener lista de tipos de referencia
  getAllReferencesType() {
    return this.http.get(`${this.gateway.url}/api/list-reference-type`);
  }

  //obtener tipo de referencia por id
  getReferenceTypeById(id) {
    return this.http.get(`${this.gateway.url}/api/reference-type/${id}`);
  }

  //editar la informacion de un tipo de referencia
  updateReferenceType(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-reference-type/${id}`, args);
  }

  //eliminar un tipo de referencia
  deleteReferenceType(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-reference-type/${id}`);
  }

  //obtener detalles de un tipo de referencia
  getDetails(id){
    return this.http.get(`${this.gateway.url}/api/reference-type-details/${id}`);
  }

  //obtener detalles de un tipo de referencia por nombre
  getDetailsByName(name){
    return this.http.get(`${this.gateway.url}/api/reference-type-details-name/${name}`);
  }

  //eliminar un detalle de tipo de referencia
  deleteReferenceTypeDetail(id) {
    return this.referenceTypeDetailService.deleteReferenceTypeDetail(id);
  }
}
