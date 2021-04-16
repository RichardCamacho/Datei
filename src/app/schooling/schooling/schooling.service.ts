import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class SchoolingService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar estudio
  registerSchooling(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-schooling`, args);
  }

  //obtener lista de todos los registros de estudio por hoja de vida
  getSchoolingByHv(idHv) {
    return this.http.get(`${this.gateway.url}/api/list-schooling/${idHv}`);
  }

  //obtener un estudio por id
  getSchoolingById(id) {
    return this.http.get(`${this.gateway.url}/api/schooling/${id}`);
  }

  //editar la informacion de un estudio
  updateSchooling(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-schooling/${id}`, args);
  }

  //eliminar un detalle tipo de referencia
  deleteSchooling(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-schooling/${id}`);
  }
}
