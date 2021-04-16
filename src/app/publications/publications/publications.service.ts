import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoauthorsService } from 'src/app/coauthors/coauthors/coauthors.service';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService, 
              private coauthorService: CoauthorsService) { }

  //registrar publicación
  registerPublication(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-publication`, args);
  }

  //obtener lista de todos los registros de publicación por hoja de vida
  getPublicationByHv(idHv) {
    return this.http.get(`${this.gateway.url}/api/list-publication/${idHv}`);
  }

  //obtener una publicación por id
  getPublicationById(id) {
    return this.http.get(`${this.gateway.url}/api/publication/${id}`);
  }

  //editar la informacion de una publicación
  updatePublication(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-publication/${id}`, args);
  }

  deletePublication(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-publication/${id}`);
  }

  //coautores
  getCoauthors(idPb){
    return this.coauthorService.getCoauthorByPb(idPb);
  }
  deleteCoauthor(id){
    return this.coauthorService.deleteCoauthor(id);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }
}
