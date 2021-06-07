import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectFoldersService } from 'src/app/subject-folders/subject-folders/subject-folders.service';
import { SubjectInformationService } from 'src/app/subject-information/subject-information/subject-information.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class SubjectsInfoService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient,
              private subjectFoldersService: SubjectFoldersService) { }

  getAllSubjects(ind){
    return this.subjectFoldersService.getAllSubjectsFoldersDetail(ind);
  }
}
