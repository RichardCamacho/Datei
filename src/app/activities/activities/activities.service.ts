import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar actividad de compromiso
  registerActivity(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-activity`, args);
  }

  //obtener lista de todos los registros de actividad de compromiso por acta
  getActivityByM(idActa) {
    return this.http.get(`${this.gateway.url}/api/list-activity/${idActa}`);
  }

  //obtener un actividad de compromiso por id
  getActivityById(id) {
    return this.http.get(`${this.gateway.url}/api/activity/${id}`);
  }

  //editar la informacion de un actividad de compromiso
  updateActivity(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-activity/${id}`, args);
  }

  deleteActivity(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-activity/${id}`);
  }
}

