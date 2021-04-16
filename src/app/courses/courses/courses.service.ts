import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacultyService } from 'src/app/faculty/faculty/faculty.service';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService,
              private facultyService: FacultyService) { }

  
  //registrar curso
  registerCourse(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-course`, args);
  }

  //obtener lista de cursos
  getAllCourses() {
    return this.http.get(`${this.gateway.url}/api/list-course`);
  }

  //obtener curso por id
  getCourseById(id) {
    return this.http.get(`${this.gateway.url}/api/course/${id}`);
  }

  //obtener curso por id
  getCourseDetailsById(id) {
    return this.http.get(`${this.gateway.url}/api/course-details/${id}`);
  }

  //editar la informacion de un curso
  updateCourse(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-course/${id}`, args);
  }

  //eliminar un curso
  deleteCourse(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-course/${id}`);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }

  //lista de docentes
  getFaculty(id){
    return this.facultyService.getAllFacultyByCourse(id);
  }

  //borrar docente
  deleteFaculty(id) {
    return this.facultyService.deleteFaculty(id);
  }

}
