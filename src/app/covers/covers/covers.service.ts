import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class CoversService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService) { }

  //registrar portada
  registerCover(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/upload-cover`, args);
  }

  //obtener registro de portada por curso
  getCoverByC(idC) {
    return this.http.get(`${this.gateway.url}/api/subject-cover/${idC}`);
  }

  getFileList(idS, tipo){
    return this.http.get(`${this.gateway.url}/api/list-file/${idS}/${tipo}`);
  }

  //obtener un portada por id
  getCoverById(id) {
    return this.http.get(`${this.gateway.url}/api/get-cover/${id}`);
  }

  //editar la informacion de una portada
  updateCover(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-cover/${id}`, args);
  }

  deleteCover(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-cover/${id}`);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }
}

