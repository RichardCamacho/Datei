import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/_models/user.model';
import { LoginService } from 'src/app/_services/login.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false; //identifica el estado del formulario

  get f() {
    return this.loginForm.controls;
  }

  constructor( private formBuilder: FormBuilder, private router: Router,
                private loginService: LoginService, private toastr: ToastrService,
                private spinner: NgxSpinnerService) {
                }

  loginform = true;
  recoverform = false;

  ngOnInit() {
    document.title =  `Datei - Iniciar sesión`;

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  //manejo del login
  async login(user: UserModel) {
    this.spinner.show();
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.spinner.hide();
      return;
    }
    //crea el token de autorizacion para acceder a las funcionalidades de la web
    this.loginService.authLogin(user).subscribe((res:any) => {
      sessionStorage.setItem('token', res.access_token);//guarda datos del token valido mientras no se cierre la pestaña
      this.getUserData();//consulta los datos del usuario
      this.spinner.hide();
      this.toastr.success('Credenciales correctas'); 
    }, 
    err => {
      this.spinner.hide();
      // this.toastr.error(`Error: ${err.error.error}`);
      this.toastr.error('Credenciales Incorrectas');
    });
  }

  //obtiene los datos del usuario y los almacena localmente durante la sesion
  getUserData(){
    this.loginService.gettingUser().subscribe((res:any) => {
      sessionStorage.setItem('user', res.id);//guarda id del usuario en un objeto de sesion
      sessionStorage.setItem('programa', res.programa);
      sessionStorage.setItem('nombre', res.primerNombre + ' ' + res.primerApellido + ' ' + res.segundoApellido);
      sessionStorage.setItem('email', res.email);
      this.getRolName(res.rol)
    }, 
    err => {
      this.spinner.hide();
      // this.toastr.error(`Error: ${err.error.error}`);
      this.toastr.error('Credenciales Incorrectas');
    });
  }

  //redirecciona la usuario dependiendo de su rol
  getRolName(id){
    this.loginService.getReferenceDetail(id).subscribe((res:any) => {
      sessionStorage.setItem('rol', res.nombre);

      switch (res.nombre) {
        case 'Docente':
          this.router.navigateByUrl('/app/subject-information/list');
        break;

        case 'Lider de SO':
          this.router.navigateByUrl('/app/subject-information/list');
        break;

        case 'Coordinador':
          this.router.navigateByUrl('/app/dashboard/dashboard1');
        break;

        case 'Administrador':
          this.router.navigateByUrl('/app/users/list');
        break;
      
        default:
        break;
      }
      
    });
  }
}
