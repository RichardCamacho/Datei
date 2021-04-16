import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class ServiceActivitiesService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar actividad de servicio
  registerServiceActivity(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-service-activ`, args);
  }

  //obtener lista de todos los registros de actividad de servicio por hoja de vida
  getServiceActivityByHv(idHv) {
    return this.http.get(`${this.gateway.url}/api/list-service-activ/${idHv}`);
  }

  //obtener una actividad de servicio por id
  getServiceActivityById(id) {
    return this.http.get(`${this.gateway.url}/api/service-activ/${id}`);
  }

  //editar la informacion de una actividad de servicio
  updateServiceActivity(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-service-activ/${id}`, args);
  }

  deleteServiceActivity(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-service-activ/${id}`);
  }
}

