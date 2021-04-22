import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurriculumVitaeService } from 'src/app/curriculum-vitae/curriculum-vitae/curriculum-vitae.service';
import { ReferencesTypeDetailService } from 'src/app/references-type/references-type-detail/references-type-detail.service';
import { SectionsService } from 'src/app/sections/sections/sections.service';
import { SubjectInformationService } from 'src/app/subject-information/subject-information/subject-information.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class SubjectFoldersService {
  
  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, 
              private curriculumViateService: CurriculumVitaeService,
              private subjectService: SubjectInformationService,
              private sectionService: SectionsService, 
              private referencesTypeDetailService: ReferencesTypeDetailService) { }

  //registrar carpeta de asignatura
  registerSubjectFolder(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-subject-folder`, args);
  } 

  //obtener lista de TODAS las carpetas de asignatura
  getAllSubjectFolders() {
    return this.http.get(`${this.gateway.url}/api/list-subject-folder`);
  }

  //obtener lista de carpetas de asignatura por usuario
  getAllSubjectFolderByUser(idUsuario) {
    return this.http.get(`${this.gateway.url}/api/list-subject-folder/${idUsuario}`);
  }

  //obtener carpeta de asignatura por id
  getSubjectFolderById(id) {
    return this.http.get(`${this.gateway.url}/api/subject-folder/${id}`);
  }

  //editar la informacion de una carpeta de asignatura
  updateSubjectFolder(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-subject-folder/${id}`, args);
  }

  //eliminar una carpeta de asignatura
  deleteSubjectFolder(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-subject-folder/${id}`);
  }

  //obtener una hoja de vida por id de usuario
  getCurriculumByIdUser(id) {
    return this.curriculumViateService.getCurriculumByIdUser(id);
  }

  //obtener lista de cursos por id de usuario
  getSubjectsByIdUser(id) {
    return this.subjectService.getAllSubjects(id);
  }

  getSubjectById(id){
    return this.subjectService.getSubjectById(id);
  }

  getSubjectDetById(id){
    return this.subjectService.getSubjectDetailsById(id);
  }

  //secciones
  getSectionByC(idC){
    return this.sectionService.getSectionByC(idC);
  }
  deleteSection(id){
    return this.sectionService.deleteSection(id);
  }
  
  //buscar el curso
  getCursoInfo(id){
    return this.referencesTypeDetailService.getReferenceTypeDetailById(id);
  }
}
