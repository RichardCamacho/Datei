import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferencesTypeService } from 'src/app/references-type/references-type/references-type.service';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class RegisterUsersService {

  gateway = CONFIG.gateway;
  
  constructor(private http: HttpClient, private referencesTypeService: ReferencesTypeService) { }

  //registrar usuario
  registerUser(dataArgs){
    let args: any;
    args = dataArgs;

    // const header = new HttpHeaders({
    //   'Authorization':`Bearer ${sessionStorage.getItem('token')}`
    // });

    return this.http.post(`${this.gateway.url}/api/register-user`, args);
  }

  //obtener lista de usuarios
  getAllUsers() {
    return this.http.get(`${this.gateway.url}/api/list-users`);
  }

  //obtener usuario por id
  getUserById(id) {
    return this.http.get(`${this.gateway.url}/api/user/${id}`);
  }

  //editar la informacion de un usuario
  updateUser(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-user/${id}`, args);
  }

  //eliminar un usuario
  deleteUser(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-user/${id}`);
  }

  //obtiene los detalles de un tipo de referencia por el nombre de la misma
  getDetailsByName(name){
    return this.referencesTypeService.getDetailsByName(name);
  }
}
