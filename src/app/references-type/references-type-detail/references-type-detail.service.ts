import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class ReferencesTypeDetailService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar detalles de tipo de referencia
  registerReferenceTypeDetail(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-reference-type-detail`, args);
  }

  //obtener lista de todos los detalles de tipos de referencia
  getAllReferencesTypeDetails() {
    return this.http.get(`${this.gateway.url}/api/list-reference-type-detail`);
  }

  //obtener un detalle de tipo de referencia por id
  getReferenceTypeDetailById(id) {
    return this.http.get(`${this.gateway.url}/api/reference-type-detail/${id}`);
  }

  //editar la informacion de un detalle de tipo de referencia
  updateReferenceTypeDetail(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-reference-type-detail/${id}`, args);
  }

  //eliminar un detalle tipo de referencia
  deleteReferenceTypeDetail(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-reference-type-detail/${id}`);
  }
}
