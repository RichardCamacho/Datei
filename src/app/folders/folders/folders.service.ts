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

  
  getAllSubjectFolders(){
    return this.subjectFolderService.getAllSubjectFolders();
  }
  
  deleteSubjectFolder(id){
    return this.subjectFolderService.deleteSubjectFolder(id);
  }

  getAllSoFolders(){
    return this.soFolderService.getAllSoFolders();
  }
  
  deleteSoFolder(id){
    return this.soFolderService.deleteSoFolder(id);
  }
}
