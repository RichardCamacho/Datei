import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class StudentOutcomesService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar student outcome
  registerStudentOutcome(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-student-outcome`, args);
  }

  //obtener lista de todos los registros de student outcome por curso
  getStudentOutcomeByC(idC) {
    return this.http.get(`${this.gateway.url}/api/list-student-outcome/${idC}`);
  }

  //obtener un student outcome por id
  getStudentOutcomeById(id) {
    return this.http.get(`${this.gateway.url}/api/student-outcome/${id}`);
  }

  //editar la informacion de un student outcome
  updateStudentOutcome(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-student-outcome/${id}`, args);
  }

  deleteStudentOutcome(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-student-outcome/${id}`);
  }
}


