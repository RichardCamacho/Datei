import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { sameFields } from 'src/app/_shared/same-fields.validator';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  contrseniaForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  passwords;
  userId;

  //parametros de translate
  param8 = {value: '8'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '10000'};

  get f() {
    return this.contrseniaForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, 
              private translate: TranslateService, private changePasswordService: ChangePasswordService,
              private spinner: NgxSpinnerService) {

              }

  ngOnInit(): void {
    this.contrseniaForm = this.formBuilder.group({
      // cActual:["", [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      password:["", [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      repPassword:["", [Validators.required]]//campo auxiliar
    },
    {
      validators: sameFields
    });

    this.userId = parseInt(sessionStorage.getItem('user'));
  }

  //uso del pipe de campos iguales
  camposIguales(): boolean {
    return this.contrseniaForm.hasError('noSonIguales') &&
      this.contrseniaForm.get('password').dirty &&
      this.contrseniaForm.get('repPassword').dirty;
  }

  //metodo para el control de envio de la información del formulario
  onSubmit(){
    this.submitted = true;
    if (this.contrseniaForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.passwords = {
      'nueva':this.f.password.value
    }
    this.onChangePassword();
  }

  onChangePassword(){
    //llamar al servicio para cambiar la contraseña
    this.spinner.show();
    this.changePasswordService.changePassword(this.passwords, this.userId).subscribe( (res: any) => {
      this.translate.get('success_create_update').subscribe((res: string) => {
        this.spinner.hide();
        this.toastr.success(res);
        this.submitted = false;
      });
      this.contrseniaForm.reset();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
      this.submittedUp = false;
    });
  }

}
