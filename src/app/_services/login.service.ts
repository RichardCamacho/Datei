import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONFIG } from '../_config/config';
import { UserModel } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // headers: HttpHeaders;
  
  gateway = CONFIG.gateway;

  constructor(private http: HttpClient, private router: Router){
  }

  //autenticar el usuario
  authLogin(user: UserModel){

    const response = {
      username:user.email,
      password:user.password,
      grant_type:'password',
      client_id:2,
      client_secret:'f963psQYD2NvKoFXHLPrK1HDQdP7N0FB77h4CtDm',
      scope:'*',
    }

    return this.http.post(this.gateway.url+'/oauth/token', response);
  }

  //cerrar sesión
  logOut(){
    sessionStorage.removeItem('token');
    this.router.navigate([`/`]);
  }

  //obtener los datos del usuario que acaba de ingresar
  gettingUser(){
    const header = new HttpHeaders({
      'Authorization':`Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get(this.gateway.url+'/api/user', {headers: header} );
  }

  // indica si el usuario se encuentra en sesión para acceder a alguna ruta de la app.
  isLoggedIn(): boolean {
    if (sessionStorage.getItem('token')) {
      // console.log('true')
      return true;
    }
    // console.log('false')
    return false;
  }
  
    // indica si el usuario se encuentra registrado o no.
  currentUser(): string {
    if (sessionStorage.getItem('user')) {
      const username = sessionStorage.getItem('email');
      return username;
    }
    return null;
  }

  getReferenceDetail(idRef){
    return this.http.get(`${this.gateway.url}/api/reference-type-detail/${idRef}`)
  }

  getRole(){
    return sessionStorage.getItem('rol');
  }

}