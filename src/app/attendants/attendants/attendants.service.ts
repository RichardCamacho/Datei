import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class AttendantsService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar asistente
  registerAttendant(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-attendant`, args);
  }

  //obtener lista de todos los registros de asistente por acta
  getAttendantByM(idActa) {
    return this.http.get(`${this.gateway.url}/api/list-attendant/${idActa}`);
  }

  //obtener un asistente por id
  getAttendantById(id) {
    return this.http.get(`${this.gateway.url}/api/attendant/${id}`);
  }

  //editar la informacion de un asistente
  updateAttendant(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-attendant/${id}`, args);
  }

  //borra un registro de asistente
  deleteAttendant(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-attendant/${id}`);
  }
}

