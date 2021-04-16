import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivitiesService } from 'src/app/activities/activities/activities.service';
import { AttendantsService } from 'src/app/attendants/attendants/attendants.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class MinutesService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient,
              private attendantsService: AttendantsService,
              private activitiesService: ActivitiesService) { }

  //registrar acta
  registerMinute(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-minute`, args);
  }

  //obtener lista de actas
  getMinutesByC(idCarpeta) {
    return this.http.get(`${this.gateway.url}/api/list-minute/${idCarpeta}`);
  }

  //obtener acta por id
  getMinuteById(id) {
    return this.http.get(`${this.gateway.url}/api/minute/${id}`);
  }

  //editar la informacion de un acta
  updateMinute(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-minute/${id}`, args);
  }

  //eliminar un acta
  deleteMinute(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-minute/${id}`);
  }

  //asistentes
  getAttendants(idM){
    return this.attendantsService.getAttendantByM(idM);
  }
  deleteAttendant(id){
    return this.attendantsService.deleteAttendant(id);
  }

  //Actividades de compromiso
  getActivities(idM){
    return this.activitiesService.getActivityByM(idM);
  }
  deleteActivity(id){
    return this.activitiesService.deleteActivity(id);
  }
}