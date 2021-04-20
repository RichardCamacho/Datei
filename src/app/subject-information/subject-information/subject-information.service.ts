import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BooksService } from 'src/app/books/books/books.service';
import { CoursesService } from 'src/app/courses/courses/courses.service';
import { CoversService } from 'src/app/covers/covers/covers.service';
import { PrerequisitesService } from 'src/app/prerequisites/prerequisites/prerequisites.service';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { SpecificObjectivesService } from 'src/app/specific-objectives/specific-objectives/specific-objectives.service';
import { StudentOutcomesService } from 'src/app/student-outcomes/student-outcomes/student-outcomes.service';
import { TopicsService } from 'src/app/topics/topics/topics.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class SubjectInformationService {
  
  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService,
              private booksService: BooksService,
              private objectiveService: SpecificObjectivesService,
              private studentOutcomeService: StudentOutcomesService,
              private prerequisiteService: PrerequisitesService,
              private topicService: TopicsService,
              private coverService: CoversService,
              private courseService: CoursesService) { }

  //registrar curso
  registerSubject(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-subject`, args);
  }

  //obtener lista de cursos
  getAllSubjects(idUsuario) {
    return this.http.get(`${this.gateway.url}/api/list-subject/${idUsuario}`);
  }

  //obtener curso por id
  getSubjectById(id) {
    return this.http.get(`${this.gateway.url}/api/subject/${id}`);
  }

  //obtener curso por id
  getSubjectDetailsById(id) {
    return this.http.get(`${this.gateway.url}/api/subject-details/${id}`);
  }

  //editar la informacion de un curso
  updateSubject(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-subject/${id}`, args);
  }

  //eliminar un curso
  deleteSubject(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-subject/${id}`);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }

  //obtiene la lista de cursos registrados
  getCourses(){
    return this.courseService.getAllCourses();
  }

  //obtiene los docentes
  getFaculty(id){
    return this.courseService.getFaculty(id);
  }

  //libros
  getBooks(idC){
    return this.booksService.getBookByC(idC);
  }
  deleteBook(id){
    return this.booksService.deleteBook(id);
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

  //Student Outcome
  getStudentOutcomes(idC){
    return this.studentOutcomeService.getStudentOutcomeByC(idC);
  }
  deleteStudentOutcome(id){
    return this.studentOutcomeService.deleteStudentOutcome(id);
  }

  //Temas de curso
  getTopics(idC){
    return this.topicService.getTopicByC(idC);
  }
  deleteTopic(id){
    return this.topicService.deleteTopic(id);
  }

  //Portada-----------------------------------------------------------------------
  getCover(idC){
    return this.coverService.getCoverByC(idC);
  }
  deleteCover(id){
    return this.coverService.deleteCover(id);
  }
  getCoverInfo(id){
    return this.coverService.getCoverInfo(id);
  }

  getUrlFileUpload(){
    return `${this.gateway.url}/api/upload-cover`;
  }

  getImgContent(filename){
    // return `${this.gateway.url}/master/uploads/img/${filename}`;
  }

}
