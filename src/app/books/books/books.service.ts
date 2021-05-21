import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar libro
  registerBook(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-book`, args);
  }

  //obtener lista de todos los registros de libro por curso
  getBookByC(idC) {
    return this.http.get(`${this.gateway.url}/api/list-book/${idC}`);
  }

  //obtener un libro por id
  getBookById(id) {
    return this.http.get(`${this.gateway.url}/api/book/${id}`);
  }

  //editar la informacion de un libro
  updateBook(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-book/${id}`, args);
  }

  //eliminar el reistro de un libro
  deleteBook(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-book/${id}`);
  }
}

