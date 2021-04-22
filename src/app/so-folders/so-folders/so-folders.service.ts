import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContinuousImprovementService } from 'src/app/continuous-improvement/continuous-improvement/continuous-improvement.service';
import { MinutesService } from 'src/app/minutes/minutes/minutes.service';
import { ReferencesTypeDetailService } from 'src/app/references-type/references-type-detail/references-type-detail.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class SoFoldersService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, 
              private continuousImprovementService: ContinuousImprovementService,
              private minutesService: MinutesService,
              private referencesTypeDetailService: ReferencesTypeDetailService
              ) { }

  //registrar carpeta de student outcome
  registerSoFolder(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-so-folder`, args);
  } 

  //obtener lista de TODAS las carpetas de student outcome
  getAllSoFolders() {
    return this.http.get(`${this.gateway.url}/api/list-so-folder`);
  }

  //obtener lista de carpetas de student outcome por usuario
  getAllSoFolderByUser(idUsuario) {
    return this.http.get(`${this.gateway.url}/api/list-so-folder/${idUsuario}`);
  }

  //obtener carpeta de student outcome por id
  getSoFolderById(id) {
    return this.http.get(`${this.gateway.url}/api/so-folder/${id}`);
  }

  //editar la informacion de una carpeta de student outcome
  updateSoFolder(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-so-folder/${id}`, args);
  }

  //eliminar una carpeta de student outcome
  deleteSoFolder(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-so-folder/${id}`);
  }

  //obtener actas de so
  getMinutesBySoFolder(id){
    return this.minutesService.getMinutesByC(id);
  }
  deleteMinute(id){
    return this.minutesService.deleteMinute(id);
  }

  //obtener actas de mejoramiento continuo
  getContImprovementsBySoFolder(id){
    return this.continuousImprovementService.getContImprovementByC(id);
  }
  deleteContImprovement(id){
    return this.continuousImprovementService.deleteContImprovement(id);
  }

  //buscar el curso
  getCursoInfo(id){
    return this.referencesTypeDetailService.getReferenceTypeDetailById(id);
  }
}
