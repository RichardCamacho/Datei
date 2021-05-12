import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolingComponent } from './schooling/schooling.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [SchoolingComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    ConfirmationService,
    TranslateService
  ]
})
export class SchoolingModule { }
