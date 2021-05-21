import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SoFoldersService } from 'src/app/so-folders/so-folders/so-folders.service';
import { SubjectFoldersService } from 'src/app/subject-folders/subject-folders/subject-folders.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, 
              private subjectFolderService: SubjectFoldersService,
              private soFolderService: SoFoldersService) { }

  //consulta todos las carpetas de asignatura
  getAllSubjectFolders(){
    return this.subjectFolderService.getAllSubjectFolders();
  }
  //borra un registro de carpeta de asignatura
  deleteSubjectFolder(id){
    return this.subjectFolderService.deleteSubjectFolder(id);
  }
  //consulta todos las carpetas de asignatura

  getAllSoFolders(){
    return this.soFolderService.getAllSoFolders();
  }
  //borrar registro de carpeta de so
  deleteSoFolder(id){
    return this.soFolderService.deleteSoFolder(id);
  }
}
