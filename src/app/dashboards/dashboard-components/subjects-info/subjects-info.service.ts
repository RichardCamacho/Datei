import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectInformationService } from 'src/app/subject-information/subject-information/subject-information.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class SubjectsInfoService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient,
              private subjectInformationservice: SubjectInformationService) { }

  getAllSubjects(id){
    return this.subjectInformationservice.getAllSubjectsDetail(id);
  }
}
