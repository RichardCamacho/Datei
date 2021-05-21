import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar tema de curso
  registerTopic(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-topic`, args);
  }

  //obtener lista de todos los registros de tema de curso por curso
  getTopicByC(idC) {
    return this.http.get(`${this.gateway.url}/api/list-topic/${idC}`);
  }

  //obtener un tema de curso por id
  getTopicById(id) {
    return this.http.get(`${this.gateway.url}/api/topic/${id}`);
  }

  //editar la informacion de un tema de curso
  updateTopic(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-topic/${id}`, args);
  }

  //eliminar registro
  deleteTopic(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-topic/${id}`);
  }
}



