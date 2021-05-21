import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class ContinuousImprovementService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar actas de mejoramiento continuo
  registerContImprovement(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-continuous-improvement`, args);
  }

  //obtener lista de todos los registros de actas de mejoramiento continuo por curso
  getContImprovementByC(idC) {
    return this.http.get(`${this.gateway.url}/api/list-continuous-improvement/${idC}`);
  }

  //obtener un acta de mejoramiento continuo por id
  getContImprovementById(id) {
    return this.http.get(`${this.gateway.url}/api/continuous-improvement/${id}`);
  }

  //editar la informacion de un acta de mejoramiento continuo
  updateContImprovement(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-continuous-improvement/${id}`, args);
  }

  //borrar registro de acta mejoramiento continuo
  deleteContImprovement(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-continuous-improvement/${id}`);
  }
}

