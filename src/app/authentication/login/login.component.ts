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
  submitted = false;

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
    // sessionStorage.clear();//esto limpia el almacenamiento de credenciales tener en cuenta

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // datasource: ['']
    });
  }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  login(user: UserModel) {
    this.spinner.show();
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.spinner.hide();
      return;
    }

    this.loginService.authLogin(user).subscribe((res:any) => {
      sessionStorage.setItem('token', res.access_token);//guarda datos del token valido mientras no se cierre la pestaña
      this.router.navigateByUrl('/app/dashboard/dashboard1');
      this.getUserData();
      this.spinner.hide();
      this.toastr.success('Credenciales correctas'); 
      
    }, 
    err => {
      this.spinner.hide();
      this.toastr.error(`Error: ${err.error.error}`);
      this.toastr.error('Credenciales Incorrectas');
    });
  }

  getUserData(){
    this.loginService.gettingUser().subscribe((res:any) => {
      console.log(res);
      sessionStorage.setItem('user', res.id);//guarda id del usuario en un objeto de sesion
    }, 
    err => {
      this.toastr.error(`Error: ${err.error.message}`);
    });
  }
}
