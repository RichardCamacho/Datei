import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacultyService } from 'src/app/faculty/faculty/faculty.service';
import { PrerequisitesService } from 'src/app/prerequisites/prerequisites/prerequisites.service';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { SpecificObjectivesService } from 'src/app/specific-objectives/specific-objectives/specific-objectives.service';
import { TopicsService } from 'src/app/topics/topics/topics.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService,
              private facultyService: FacultyService,
              private objectiveService: SpecificObjectivesService,
              private prerequisiteService: PrerequisitesService,
              private topicService: TopicsService,) { }

  
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

  //Prerequisitos y corequsitos
  getPrerequisites(idC){
    return this.prerequisiteService.getPrerequisiteByC(idC);
  }
  deletePrerequisite(id){
    return this.prerequisiteService.deletePrerequisite(id);
  }

  //Objetivos
  getObjectives(idC){
    return this.objectiveService.getObjectiveByC(idC);
  }
  deleteObjective(id){
    return this.objectiveService.deleteObjective(id);
  }

  //Temas de curso
  getTopics(idC){
    return this.topicService.getTopicByC(idC);
  }
  deleteTopic(id){
    return this.topicService.deleteTopic(id);
  }

}
