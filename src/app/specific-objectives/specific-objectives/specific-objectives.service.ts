import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class SpecificObjectivesService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar objetivo
  registerObjective(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-objective`, args);
  }

  //obtener lista de todos los registros de objetivo por curso
  getObjectiveByC(idC) {
    return this.http.get(`${this.gateway.url}/api/list-objective/${idC}`);
  }

  //obtener un objetivo por id
  getObjectiveById(id) {
    return this.http.get(`${this.gateway.url}/api/objective/${id}`);
  }

  //editar la informacion de un objetivo
  updateObjective(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-objective/${id}`, args);
  }

  //eliminar registro
  deleteObjective(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-objective/${id}`);
  }
}


