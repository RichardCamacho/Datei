import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignaturesComponent } from './signatures/signatures.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CustomFormsModule } from 'ngx-custom-validators';



@NgModule({
  declarations: [SignaturesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    CustomFormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SignaturesModule { }
