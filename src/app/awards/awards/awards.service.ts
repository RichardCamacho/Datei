import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar premio
  registerAward(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-award`, args);
  }

  //obtener lista de todos los registros de premio por hoja de vida
  getAwardByHv(idHv) {
    return this.http.get(`${this.gateway.url}/api/list-award/${idHv}`);
  }

  //obtener un premio por id
  getAwardById(id) {
    return this.http.get(`${this.gateway.url}/api/award/${id}`);
  }

  //editar la informacion de un premio
  updateAward(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-award/${id}`, args);
  }

  deleteAward(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-award/${id}`);
  }
}
