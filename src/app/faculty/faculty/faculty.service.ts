import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService) { }

  //registrar docente
  registerFaculty(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-faculty`, args);
  }

  //obtener lista de todos los docentes
  getAllFaculty() {
    return this.http.get(`${this.gateway.url}/api/list-faculty`);
  }

  //obtener lista de todos los docentes por curso
  getAllFacultyByCourse(id) {
    return this.http.get(`${this.gateway.url}/api/list-faculty/${id}`);
  }

  //obtener un docente por id
  getFacultyById(id) {
    return this.http.get(`${this.gateway.url}/api/faculty/${id}`);
  }

  //editar la informacion de un docente
  updateFaculty(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-faculty/${id}`, args);
  }

  //eliminar un docente
  deleteFaculty(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-faculty/${id}`);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }
}

