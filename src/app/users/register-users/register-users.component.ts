import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { sameFields } from "../../_shared/same-fields.validator";
import { Users } from "./register-users.model";
import { RegisterUsersService } from './register-users.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.css']
})
export class RegisterUsersComponent implements OnInit {

  registerUsersForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  selectedId; // registra el id seleccionado que viene en la URL.
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE

  RolesList: any[];
  RangosList: any[];
  ProgramasList: any[];

  param8 = {value: '8'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '10000'};
  
  get f() {
    return this.registerUsersForm.controls;
  }

  user = new Users;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
              private toastr: ToastrService, private registerUserService: RegisterUsersService, private translate: TranslateService,
              private spinner: NgxSpinnerService) {
    
    this.spinner.show();

    this.activatedRoute.params.subscribe (params => {
      this.selectedId = params.id; // argumento enviado en la ruta
      if (this.selectedId === undefined || this.selectedId == null) {
        this.mode = 'CREATE';
        //spinner
      } else {
        this.mode = 'UPDATE' ;
        this.getUser(this.selectedId);
      }
    });
  }

  ngOnInit(): void {
    
    //listas
    this.getRoles();
    this.getRangos();
    this.getProgramas();

    this.registerUsersForm = this.formBuilder.group({
      id: [],
      email:["", [Validators.required, Validators.email, Validators.maxLength(100)]],
      password:["", [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      repPassword:["", [Validators.required]],//campo auxiliar
      primerNombre:["", [Validators.required, Validators.maxLength(200)]],
      segundoNombre:["", [Validators.maxLength(200)]],
      primerApellido:["", [Validators.required, Validators.maxLength(200)]],
      segundoApellido:["", [Validators.required, Validators.maxLength(200)]],
      rango:[null, [Validators.required] ],
      rol:[null, [Validators.required]],
      programa:[null, [Validators.required]]
    },
    {
      validators: sameFields
    });
    

    if(this.mode==='CREATE'){ 
      this.f.password.enable();
      this.f.repPassword.enable()
    }else{
      this.f.password.disable();
      this.f.repPassword.disable();
    }
  }

  camposIguales(): boolean {
    return this.registerUsersForm.hasError('noSonIguales') &&
      this.registerUsersForm.get('password').dirty &&
      this.registerUsersForm.get('repPassword').dirty;
  }

  //obtiene un registro de usuario especificado por su ID
  getUser(id) {
    this.registerUserService.getUserById(id).subscribe((res: any) => {
      this.user = res;
      this.registerUsersForm.patchValue(this.user);
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.registerUsersForm.invalid) {
      return;
    }
    this.submittedUp = true;
    //creando el objeto usuario porque hay un campo auxiliar de mas
    this.user.email = this.f.email.value;
    this.user.password = this.f.password.value;
    this.user.primerNombre = this.f.primerNombre.value;
    this.user.segundoNombre = this.f.segundoNombre.value;
    this.user.primerApellido = this.f.primerApellido.value;
    this.user.segundoApellido = this.f.segundoApellido.value;
    this.user.rango = this.f.rango.value;
    this.user.rol = this.f.rol.value;
    this.user.programa =  this.f.programa.value;
    this.onRegisterUser();
  }

  onRegisterUser(){
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.registerUserService.registerUser(this.user).subscribe( (res: any) => {
        this.user = res;
        this.spinner.hide();
        this.translate.get('success_create_update').subscribe((res: string) => {
          this.toastr.success(res);
        });
        this.onSaveUser(this.user.id);
      },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
        this.submittedUp = false;
      },
      () => { }
      );
    } else if (this.mode === 'UPDATE') {
      this.registerUserService.updateUser(this.user, this.user.id).subscribe(
        (res: any) => {
          this.user = res;
          this.submittedUp = false;
          this.spinner.hide();
          this.translate.get('success_create_update').subscribe((res: string) => {
            this.toastr.success(res);
          });
        },
        err => {
          this.spinner.hide();
          this.toastr.error(`Error, ${err.error.message}`);
          this.submittedUp = false;
        },
        () => { }
      );
    }
  }

  onSaveUser(id) {
    this.router.navigate([`./app/users/${id}`]);
  }

   // acciones para el botón cancelar
   onCancel() {
    this.submitted = false;
    this.registerUsersForm.reset();
    if (this.mode === 'UPDATE') {
      this.getUser(this.selectedId);
    }
  }

  
  //listas

  getRoles(){
    this.spinner.show();
    this.registerUserService.getDetailsByName('Roles').subscribe((res: any) => {
      this.RolesList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getRangos(){
    this.spinner.show();
    this.registerUserService.getDetailsByName('Rangos').subscribe((res: any) => {
      this.RangosList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getProgramas(){
    this.spinner.show();
    this.registerUserService.getDetailsByName('Programas').subscribe((res: any) => {
      this.ProgramasList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

}
