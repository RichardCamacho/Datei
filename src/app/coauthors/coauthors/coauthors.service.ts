import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class CoauthorsService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar coautores
  registerCoauthor(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-coauthor`, args);
  }

  //obtener lista de todos los coautores por publicacion
  getCoauthorByPb(idPb) {
    return this.http.get(`${this.gateway.url}/api/list-coauthor/${idPb}`);
  }

  //obtener coautores por id
  getCoauthorById(id) {
    return this.http.get(`${this.gateway.url}/api/coauthor/${id}`);
  }

  //editar la informacion de un coautor
  updateCoauthor(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-coauthor/${id}`, args);
  }

  //eliminar un registro de coautor
  deleteCoauthor(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-coauthor/${id}`);
  }
}
