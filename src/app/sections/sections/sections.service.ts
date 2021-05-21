import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/_config/config';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  gateway = CONFIG.gateway;

  constructor(private http: HttpClient) { }

  //registrar sección
  registerSection(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/register-section`, args);
  }

  //obtener lista de todos los registros de sección por carpeta
  getSectionByC(idC) {
    return this.http.get(`${this.gateway.url}/api/list-section/${idC}`);
  }

  //obtener un sección por id
  getSectionById(id) {
    return this.http.get(`${this.gateway.url}/api/section/${id}`);
  }

  //editar la informacion de un sección
  updateSection(dataArgs, id) {
    let args: any;
    args = dataArgs;
    return this.http.put(`${this.gateway.url}/api/update-section/${id}`, args);
  }

  //eliminar registro
  deleteSection(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-section/${id}`);
  }

  //gestion de archivos
  getUrlFileUpload(){
    return `${this.gateway.url}/api/upload-file`;
  }

  //registrar archivo
  registerFile(dataArgs) {
    let args: any;
    args = dataArgs;

    return this.http.post(`${this.gateway.url}/api/upload-file`, args);
  }

  //obtener registro de archivo por seccion
  getFileByS(idS) {
    return this.http.get(`${this.gateway.url}/api/section-file/${idS}`);
  }

  //obtener los archivos por seccion y tipo
  getFileList(idS, tipo){
    return this.http.get(`${this.gateway.url}/api/list-files/${idS}/${tipo}`);
  }

  //obtener un archivo por id (descarga)
  getFileById(id) {
    let headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });
    return this.http.get(`${this.gateway.url}/api/file/${id}`, { headers: headers, responseType: 'blob' as 'json'});
  }

  //eliminar registro
  deleteFile(id) {
    return this.http.delete(`${this.gateway.url}/api/delete-file/${id}`);
  }

}
